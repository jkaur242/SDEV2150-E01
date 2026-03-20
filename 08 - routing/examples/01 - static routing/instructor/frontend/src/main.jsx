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

{/* main.jsx is the entrypoint for the whole application;
    App.jsx is just the convention for the very top-level component.
*/}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes> {/* Our collection of URL routes and which components they map to. */}
        <Route path="/" element={<App />} /> {/* At the base URL, render the App component */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
