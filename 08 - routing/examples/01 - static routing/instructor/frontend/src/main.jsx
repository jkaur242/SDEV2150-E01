// react fundamentals
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// react-router components
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router';

// styles
import './index.css';

// our components
import App from './App.jsx';
import ResourceDirectoryPage from './pages/ResourceDirectoryPage';
import AdminPage from './pages/AdminPage';


{/* main.jsx is the entrypoint for the whole application;
    App.jsx is just the convention for the very top-level component.
*/}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes> {/* Our collection of URL routes and which components they map to. */}

        <Route path="/" element={<App />}> {/* At the base URL, render the App component */}

          {/* Remember how I said <Outlet /> was like 'children' prop, but for routing?
              Because we have routes nested in here, those are treated as inline content to be
              slotted into wherever that <Outlet /> is called (routing happens automatically).

              If this nesting is confusing — it's the exact same kind of setup you can go see on Github
              (header/navbar with inline pages that change, e.g. http://github.com/new is a static route
              for making a new repository; its creation form is a component that's nested inline just like
              these below, and (if Github was using react-router) would be displayed via <Outlet />).
          */}
          <Route index element={<ResourceDirectoryPage />} />
          <Route path="/admin" element={<AdminPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
