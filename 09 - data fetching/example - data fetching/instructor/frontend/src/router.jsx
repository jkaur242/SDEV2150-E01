// 1. API config / functions --------------------------------------------------

const API_BASE_URL = 'http://localhost:3000';


async function fetchResources() {
  const res = await fetch(`${API_BASE_URL}/resources`);

  if (!res.ok) {
    throw new Error(`Could not load resources: ${res.status}`);
  }

  return res.json();
}


async function fetchResourceById(resourceId) {
  const res = await fetch(`${API_BASE_URL}/resources/${resourceId}`);

  if (!res.ok) {
    throw new Error(`Could not load resource: ${res.status}`);
  }

  return res.json();
}


// 2. data loader functions ---------------------------------------------------

export async function resourceDirectoryLoader() {
  const resources = await fetchResources();
  /* For react-router data loaders, we need to return some object with
       { field: data, ... }
     which will be accessible accessible in the component as 
       data.field
     (since we won't be immediately destructuring those properties so that
     it's clearly identifiable that they come from the loaded data.)
  */
  return { resources }  // in JS, we don't need to write { resources: resources }
                        // if the variable name is already the same as the property
}


export async function adminLoader({ params }) {
  // if we had more dynamic values in our route, we'd just access those through params

  // it's objectively redundant to be refetching a specific resource by ID since all that
  // info is already contained in resources, *but* we're following a pattern where usually,
  // a general endpoint gives you summary info and a specific API result gives you more
  // detailed info.

  const resources = await fetchResources();

  // variant A: I'm at the base admin/ path; I just want all resources
  if (!params.resourceId) {
    return {
      resources,
      resourceId: null,
      selectedResource: null,
    };
  }

  // variant B: I'm at some route; I want to know what's selected
  const selectedResource = await fetchResourceById(params.resourceId);

  return {
    resources,
    resourceId: params.resourceId,
    selectedResource,
  };
}