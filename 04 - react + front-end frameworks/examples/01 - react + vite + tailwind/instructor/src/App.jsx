import './App.css'

// components
import Header from './components/Header';
import Details from './components/Details';
import Filters from './components/Filters';
import Results from './components/Results';


function App() {

    return (
      <>
        <Header tagline="I was supposed to come up with something, but have no imagination." />
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
          <Filters className="w-full" />
          <Results className="w-full" />
          <Details className="w-full" />
        </div>
      </>
    );
}

export default App
