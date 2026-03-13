import { useEffect, useState } from 'react';

const API_BASE_URL = 'http://localhost:3000'

/* we'll make an overall custom hook using both useState and useEffect
   to fetch data, control loading state, display errors, and basically everything
   responsive we want to happen during & after grabbing API data
*/
export function useResources() {

  const [resources, setResources] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState(null);

  /* We're going to update our fetch handling to use signals / abort controllers.
     docs: https://developer.mozilla.org/en-US/docs/Web/API/AbortController

       const ac = new AbortController()
       -> ac.signal  : an AbortSignal() instance, which can be used to talk to or kill an async operation
       -> ac.abort() : aborts any async operation (e.g. fetch, consuming Promises, etc.)

    In this example, I'll use this to control fetches/refetches e.g. to make sure I'm not spamming multiple
    fetches. If I want to rerun my effect below, its 'cleanup logic' will be aborting the existing async fetch.

    Real-world example: users clicks a Load button a million times.
    -> we just want to fire that entire behaviour chain (API fetch -> component re-render w/ new data) once.
  */

  async function fetchResources(signal) { // adding a signal param to my fetch handler
    console.log('starting API fetch!')
    // whenever I initiate a fetch, I'm now waiting for results, so I'll default my loading/error states:
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${API_BASE_URL}/resources`,
        {signal}  // you can pass lots of stuff into the 2nd-arg object of fetch; I just care about passing a signal rn.
      );

      if (!res.ok) { // res.ok is a boolean property that evals whether response status code was 200/20*/30*
        throw new Error(`Request failed: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      setResources(data);

    } catch (err) {
      if (err.name !== 'AbortError') { // I can abort my fetch, so I don't care about AbortErrors as 'actual problems'
        setError(err);
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Some comments here have been removed; please refer to prior commits to comments explaining useEffect.
  useEffect(
    // 1. callback: will be fetching our API data
    () => {
      // here's us using that AbortController, and passing its signal (fetchResources now expects one)
      const controller = new AbortController()
      fetchResources(controller.signal);

      return () => { // now I also implement a 'cleanup' method.
        // what's our cleanup? *If* we change this effect to re-fire when some val changes,
        // I want to cancel out existing fetches in progress.
        controller.abort()
      }
    },
    // 2. dependencies: [], i.e. when page loads
    []
  );

  function refetch() {
    const controller = new AbortController()
    fetchResources(controller.signal);
  }

  // from this hook, we return:
  return { resources, isLoading, error, refetch }
}