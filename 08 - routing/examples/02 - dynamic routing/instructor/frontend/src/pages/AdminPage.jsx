// react hooks
import { useEffect, useState } from 'react';

// react-router hooks
import { useNavigate, useParams } from 'react-router';

// our custom hooks
import { useResources } from '../hooks/useResources';

// our components
import Card from '../components/ui/Card';
import AdminForm from '../components/admin/AdminForm';


const EXAMPLE_RESOURCE = {
  title: 'Study Group',
  category: 'Wellness',
  summary: 'Studying in a group (of people).',
  location: 'NAIT Campus',
  hours: 'Mon-Fri 08:00-13:00',
  contact: 'niceperson@nait.ca',
  virtual: false,
  openNow: false,
}


export default function AdminPage() {

  const { resourceId } = useParams();  // consume dynamic props from URL/route
  const navigate = useNavigate()       // lets us programmatically 'push' the user to some page

  // console.log(resourceId)

  const { resources, isLoading, error, refetch } = useResources();

  const handleEditStart = (resource) => {
    navigate(`/admin/${resource.id}`); // navigate programmatically takes you to a path
  }

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">Admin</h1>
        <p className="text-sm text-base-content/70">
          Manage student resources.
        </p>
      </div>

      <section className="md:col-span-3 lg:col-span-3">
        <Card title="Resource Form">
          <div className="card-body">
            <AdminForm
              key={resourceId ?? 'new'}
              initialData={EXAMPLE_RESOURCE}
              resources={resources}
              resourceId={resourceId}
              isEditing={Boolean(resourceId)}
              refetch={refetch}
              navigate={navigate}
            />
          </div>
        </Card>
      </section>

      <section className="md:col-span-3 lg:col-span-3">
        <Card title="Current Resources">
          <div className="card-body">
            {isLoading && <p>Loading resources...</p>}

            {error && (
              <div className="alert alert-error">
                <span>{error.message}</span>
                <button className="btn btn-sm" onClick={refetch}>Try again</button>
              </div>
            )}
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li
                  key={resource.id}
                  className="rounded border border-gray-200 p-3"
                  onClick={() => {handleEditStart(resource)}}
                >
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


