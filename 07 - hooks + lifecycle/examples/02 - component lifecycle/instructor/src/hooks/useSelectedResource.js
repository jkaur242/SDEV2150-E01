import { useEffect, useState } from 'react';

const STORAGE_KEY = 'selectedResource';

export function useSelectedResource() {
  const [selectedResource, setSelectedResource] = useState(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
    
    return null;
  });

  // Replacing our setter wrapper with useEffect. Previous example was
  // sort of a 'homebrew version', but it doesn't let us hook into e.g.
  // state changes in React to re-fire the update; we'd have to control that
  // manually.

  // This way, we can just pop selectedResource in the dependency array, and 
  // any time it changes for any reason, this effect will refire, updating
  // what's shown in the Details card.
  useEffect(
    // param 1: callback logic
    () => {
      if (selectedResource === null) {
        sessionStorage.removeItem(STORAGE_KEY);
      } else {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(selectedResource));
      }
    },
    // param 2: dependency array
    [selectedResource] // anytime this changes, effect will re-fire!
  )

  return [selectedResource, setSelectedResource];
}
