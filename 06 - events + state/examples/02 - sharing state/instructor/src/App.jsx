import { useState } from 'react';

import Header from './components/Header';
import Filters from './components/Filters';
import Results from './components/Results';
import Details from './components/Details';
import PageLayout from './components/layout/PageLayout';

function App() {

  // We're going to pass both stateful variable & its setter down to individual components as props.
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [openNow, setOpenNow] = useState(false);
  const [virtual, setVirtual] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  return (
    <PageLayout header={<Header tagline="Find the right resources, right away" />}>
      <aside className="md:col-span-3 lg:col-span-1">
        <Filters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategories={selectedCategories}
          onCategoriesChange={setSelectedCategories}
          openNow={openNow}
          onOpenNowChange={setOpenNow}
          virtual={openNow}
          onVirtualChange={openNow}
        />
      </aside>
      <section className="md:col-span-2 lg:col-span-1">
        <Results
          selectedResource={selectedResource}
          onSelectResource={setSelectedResource}
          searchTerm={searchTerm}
          selectedCategories={selectedCategories}
          openNow={openNow}
        />
      </section>
      <aside className="md:col-span-1 lg:col-span-1">
        {selectedResource ? (
          <Details resource={selectedResource} />
        ) : (
          <div className="text-sm text-base-content/70">
            Please select a result to show details.
          </div>
        )}
      </aside>
    </PageLayout>
    // <PageLayout
    //   header={<Header tagline="Find the right resources, right away" />}
    //   left={<Filters />}
    //   middle={<Results />}
    //   right={<Details />}
    // />

  );
}

export default App;
