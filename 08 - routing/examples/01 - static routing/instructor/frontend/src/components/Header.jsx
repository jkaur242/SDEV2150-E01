import { NavLink } from 'react-router';

export default function Header({ tagline }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-2">

      {/* Our O.G. header content */}
      <div>
        <h1 className="text-xl font-semibold text-sky-600">NAIT Resource Directory</h1>
        <p className="text-sm text-gray-500">
          {tagline ? tagline : 'Find student support services, labs, and campus resources.'}
        </p>
      </div>

      {/* We'll add some buttons that you'll be able to click on to toggle the inline page. 

          These won't render (they'll error out trying to) until we've set up a router for
          our application, which we'll do next in main.jsx!
      */}

      {/* <nav> is a built-in HTML element for grouping a bunch of navigation links together. */}
      <nav className="flex gap-2">

        {/* NavLink is a react-router component that takes a prop 'to', and sends you to that URL path
            upon clicking (as long as there's a <Router> for the app with that path configured).
        */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `btn btn-sm cursor-pointer btn-ghost text-xs ${isActive ? 'text-sky-700' : 'hover:text-sky-700'}`
          }
        >
          Directory
        </NavLink>

        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `btn btn-sm cursor-pointer btn-ghost text-xs ${isActive ? 'text-sky-700' : 'hover:text-sky-700'}`
          }
        >
          Admin
        </NavLink>
      </nav>

    </div>
  );
}
