// react hooks
import { useState } from 'react';

// our custom hooks
import { useResources } from '../hooks/useResources';

// our components
import Card from'../components/ui/Card';

export default function AdminPage() {

  // Unlike the Filters card example, we can also just pack all our form data into one object:
  const [formData, setFormData] = useState({
    title: 'Study Group',
    category: 'Wellness',
    summary: 'Some summary of the resource.',
    location: 'NAIT Campus',
    hours: 'Mon-Fri 08:00-13:00',
    contact: 'study@nait.ca',
    virtual: false,
    openNow: false,
  })

  {/* We're just reusing the hook we made to grab all our student services resources from API!
      
      This is the nice thing about modular components & logic — we can isolate out something
      that performs a specific function/role, and reuse it!

      We had to do zero effort to populate our list of resources for the admin page, and it will
      work exactly the same way in all the places it's used. And if we needed to fix something in that
      logic, we only have to fix it in one place!
  */}
  const { resources, isLoading, error, refetch } = useResources();

  async function handleCreateResource(e) {
    e.preventDefault();

    const res = await fetch('http://localhost:3000/resources', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error('Could not create resource');
    }

    // Here's that function we returned from the useResources hook to give
    // downstream components a way to reiniate data fetching independently
    // of useEffect, which relies on state/props changing - e.g. a "Try again" button.
    
    // Most well-configured APIs return the thing you just created in a successful
    // response body, so needing this refetch depends on how a specific API works.
    // But, the idea here is, we just made something new, so let's grab fresh data
    // to render from (which will include the thing we just made).
    refetch();
  }

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">Admin</h1>
        <p className="text-sm text-base-content/70">
          Manage student resources.
        </p>
      </div>

      {/* Example implementation of some form inputs. 

          Note (refresher on spread operator) the onChange handler:
            onChange={
              (e) => setFormData(
                { ...formData, title: e.target.value }
              )
            }

          Similar to spreading an array:
            const arr1 = [1, 2, 3]
            const arr2 = [4, 5, 6]
            const both = [...arr1, ...arr2]

          The spread operator is used to flatten any sequenceable type
          into a series that can be inserted into another sequence.

          We can do this with objects, not just arrays, and we must fully
          reconstruct the value/object/etc. when passing to state setter,
          because the state variable is *immutable* (need to be completely overwritten).

          So here, we're saying, "get all of the properties, then overwrite title specifically"
          (most recent value is what is used).  

      */}
      <section className="md:col-span-3 lg:col-span-3">

        <Card title="Resource Form">
          <div className="card-body">

            <form onSubmit={handleCreateResource} id="frm-add-resource" className="space-y-4">

              <div className="space-y-1">
                <label htmlFor="q" className="block text-sm font-medium text-gray-700">
                  Search
                </label>
                <input
                  id="q"
                  type="text"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Resource title"
                />
              </div>

              <hr className="border-gray-200" />

              <div className="flex gap-2">
                <button
                  type="reset"
                  className="rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  onClick={() => setFormData({
                    title: '',
                    category: '',
                    summary: '',
                    location: '',
                    hours: '',
                    contact: '',
                    virtual: false,
                    openNow: false,
                  })}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                >
                  Add Resource
                </button>
              </div>

            </form>

          </div>
        </Card>

      </section>

      {isLoading && <p>Loading resources...</p>}

      {error && (
        <div className="alert alert-error">
          <span>{error.message}</span>
          <button className="btn btn-sm" onClick={refetch}>Try again</button>
        </div>
      )}

      <section className="md:col-span-3 lg:col-span-3">
        <Card title="Current Resources">
          <div className="card-body">
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.id} className="rounded border border-gray-200 p-3">
                  <p className="font-semibold">{resource.title}</p>
                  <p className="text-sm text-base-content/70">{resource.category}</p>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </section>
    </>
  );
}
