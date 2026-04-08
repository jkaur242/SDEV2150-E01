// routing components
import { Outlet } from 'react-router';

// our components
import Header from './components/Header';
import PageLayout from './components/layout/PageLayout';


function App() {


  return (
    <PageLayout header={<Header tagline="Find the right resources, right away" />}>
      <Outlet />
      {/* ^ Think 'children' in React components/props, or slots in vanilla web components —
          this is a way to have dynamic inline content; we'll set up the routes/assignment
          elsewhere, but Outlet basically just says, "render the child nodes we're supposed to
          at some URL based on its routing."

          PageLayout is still just a container for stuff that it doesn't know about, doesn't need to
          know about, and (because we want composition, not coupling) shouldn't know about.
       */}
    </PageLayout>
  );
}

export default App;
