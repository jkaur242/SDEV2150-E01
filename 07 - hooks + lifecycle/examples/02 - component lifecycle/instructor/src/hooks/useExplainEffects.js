import { useEffect, useState } from 'react';

/* React useEffect documentation (awesome): https://react.dev/reference/react/useEffect#usage

  useEffect is another React hook we use to execute logic outside React's responsibilty — usually
  to communicate with an external system (e.g. REST API, db backend, HTTP/WSS connections, etc.) — 
  *while* still binding/automating that behaviour with React and its component lifecycle.

  useEffect hooks fire *after* all initial / 'pure' rendering in React is complete.
  
  The general pattern is:
*/

function Component() {

  useEffect(
    () => {},  // param 1: callback function, whatever logic should fire as the effect
    []         // param 2: dependency array — controls *when* effect should re-fire
  )

}


/* We'll go backwards and talk about the dependency array first.


   param 2: the dependency array

   An effect fires when the component loads, and re-fires according to the dependency array
   with three variants:

   1. (missing dep. array / 2nd arg) -> effect re-fires every time component re-renders (generall unadvised)
   2. []      -> if 2nd arg is an empty array, effect fires when component loads, but doesn't re-fire
   3. [value] -> if there are values in the dep array, effect re-fires every time those values change

   *Values in dependency array should be component props *or* stateful values.
*/

function ComponentDependencyArray({ someProp }) {

  const [someValue, setSomeValue] = useState(null);

  useEffect(
    () => { console.log('oop i fired') }, // param1: logic that should run when effect fires
    []                    // option 1: would only fire when this component loads in.
//  [someValue, someProp] // option 2: would fire on load-in, and re-fire when either of these change
//                        // option 3: (no 2nd arg) would fire *every time* component re-render for any reason
  )

}


/* Now, let's break down the behaviour available in the callback.

   param 1: the callback function

   The callback can contain just 'setup' logic to fire for the effect, 
   *and optionally*, return *another* callback to run as 'cleanup' behaviour.

   e.g. I want to connect to a chat server/channel on load, but disconnect when that channel changes.

   As the React docs explain with lovely colour-coding, the order of operations is:
   - 'setup' logic first fires when the component mounts
   - if the effect ever re-fires (depending on dep array), then:
      - first, the 'cleanup' logic (nested return callback) fires with old state/props
      - then,  the 'setup' logic fires with new state/props
*/

function ComponentWithCleanup ({ someProp }) {

  useEffect(
    () => {
      console.log('this is my setup logic')      // fires always when component loads, and
                                                 // fires *after cleanup* on re-firing effect, w/ new props/state

      return () => {
        console.log('this is my cleanup logic')  // fires *first* on re-firing effect, w/ old props/state
                                                 // -> also, is optional.
      }
    },   // param 1: callback
    [someProp]  // param 2: dependency array (in this case, whenever someProp changes)
  )

}


/* Let's look at that concrete example from React docs using a Chatroom — think Discord,
   which is LITERALLY written in React.

   (interactive version: https://react.dev/reference/react/useEffect#examples-connecting )

*/
function ChatRoom({ roomId }) {

  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(
    // param 1: callback that runs when effect fires
    () => {
      // 1.a) setup logic: create some web connection to server url @ room ID
      //                   if effect is *re*-firing, run setup logic with *new* state/props
      const connection = createConnection(serverUrl, roomId);
      connection.connect();

      // 1.b) cleanup logic: if effect re-fires, it means (see dep array) serverUrl or roomId changed
      return () => {
        // therefore, disconnect from the old room/URL (cleanup runs first, with old state/props)
        connection.disconnect();
      };
    },

    // param 2: dependency array
    [serverUrl, roomId]
  );

}
