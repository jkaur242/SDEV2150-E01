import ResultsItem from './ResultsItem';
import { resources } from '../data/resources';
import Card from './ui/Card';

export default function Results({
  selectedResource,
  onSelectResource,
  searchTerm,
  selectedCategories,
  openNow,
  virtual,
}) {
  // In this example starter, we've already implemented state here to track which item is selected.

  return (
    <Card title="Results">
      <ul className="divide-y divide-gray-200">
        {resources.filter((r) => {
          // I want to check every element for whether it matches each filter option,
          const matchesSearch   = r.title.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(r.category.toLowerCase());
          const matchesOpenNow  = !openNow || r.openNow;
          const matchesVirtual = !virtual || r.virtual;
          // Then return true or false as the result of this conditional expression if *all*
          // those checks match (I might have multiple filters being used at once).
          return matchesSearch && matchesCategory && matchesOpenNow
        })
          .map((r) => (
            <ResultsItem
              key={r.id}
              title={r.title}
              category={r.category}
              summary={r.summary}
              location={r.location}
              onClick={() => onSelectResource(r)}
              selected={selectedResource?.id === r.id}
            >
              {/* Above, I'm passing two new props to ResultsItem:
                  - onClick  -> what should happen when something is clicked (arrow function firing the setter)
                  - selected -> (for each result item), do a check to see if the item is selected or not
              */}
              {/* children: optional badge content */}
              {r.openNow && (
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                  Open now
                </span>
              )}
            </ResultsItem>
        ))}
      </ul>
    </Card >
  );
}