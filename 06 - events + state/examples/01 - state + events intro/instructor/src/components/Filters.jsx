import { useState } from 'react';

// ui
import Card from './ui/Card';

// src/components/Filters.jsx
export default function Filters() {

  const [searchText, setSearchText] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [openNow, setOpenNow] = useState(false);
  const [virtual, setVirtual] = useState(false);

  function resetForm() {
    setSearchText('');
    setSelectedCategories([]);
    setOpenNow(false);
    setVirtual(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("form submitted");

    /* Normally, when you submit a form, you want to clear the inputs. *However*, in this case,
       I'm choosing to keep the filters as-is because I want the user to still be able to see
       their filters while they're narrowing down what gets shown in Results.
    */
  }

  function toggleCategory(category) {
    // we're going to do some slightly complex logic in our setter function
    // to 'simulate' toggling each category
    setSelectedCategories(
      (existing) => {
        // if our existing selected terms already includes whatever just got clicked,
        // that means we're *deselecting* it,
        if (existing.includes(category)) {
          // so filter it out of the existing terms (and update the array)
          return existing.filter(
            (cat) => cat !== category
          );
        }

        // otherwise, (it wasn't selected and now we're selecting it)
        // so just add it to the array of selected categories
        return [...existing, category]

        // The big thing to note here is that state variables are immutable — you can't e.g.
        // push or pop from an array if that's what's in state; you need to completely reconstruct
        // the array (or whatever value you want to change the state to) and then pass that to the setter.
      }
    )
  }

  return (
    <Card title="Filters">
      <div className="space-y-4 p-4">
        <form
          id="frm-filter"
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          <div className="space-y-1">
            <label htmlFor="q" className="block text-sm font-medium text-gray-700">
              Search
            </label>
            <input
              id="q"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              placeholder="Try: tutoring, mental health, bursary"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
            />
            Search term is: {searchText}
          </div>

          <hr className="border-gray-200" />

          <div className="space-y-2">
            <div className="text-sm font-semibold text-gray-800">Category</div>
            <div className="flex flex-wrap gap-2" aria-label="Category filters">
              {['All', 'Academic', 'Wellness', 'Financial', 'Tech'].map((label) => (
                <button
                  key={label}
                  type="button"
                  className={`${selectedCategories.includes(label) && 'bg-sky-600 text-white'} rounded border border-sky-600 px-3 py-1 text-xs font-semibold text-sky-700 hover:bg-sky-50`}
                  onClick={() => toggleCategory(label)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                id="openNow"
                className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                checked={openNow}
                onChange={(e) => setOpenNow(event.target.checked)}
              />
              Open now
            </label>
            {/* Conditional rendering, simple example:
                
                a) I can use && (AND) operator — basically, a more concise if statement —
                   to only render something if a condition passess. We'd use this in cases
                   where we don't need/want anything to happen if the check fails.
                     e.g. deliveryChecked && renderDeliveryForm()

                b) I can instead use a ternary (condition ? ifTruthy : ifFalsey) — basically,
                   a more concise if-else — if I want specific things to happen/render for *either*
                   a pass or a failure of the condition.
                     e.g. deliveryChecked ? renderDeliveryForm() : renderPickupSelection()
            */}
            <p>Open now: {openNow ? 'Yes' : 'No'}</p>


            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                id="virtual"
                className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                checked={virtual}
                onChange={(e) => setVirtual(event.target.checked)}
              />
              Virtual options
            </label>
          </div>

          <hr className="border-gray-200" />

          <div className="flex gap-2">
            <button
              type="button"
              className="rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              onClick={resetForm}
            >
              Reset
            </button>
            <button
              type="submit"
              className="rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
            >
              Filter
            </button>
          </div>
        </form>
      </div>
    </Card >
  );
}
