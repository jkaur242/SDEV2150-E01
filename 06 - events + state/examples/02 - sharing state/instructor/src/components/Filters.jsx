import Card from './ui/Card';

export default function Filters({
  searchTerm,
  onSearchChange,
  selectedCategories,
  onCategoriesChange,
  openNow,
  onOpenNowChange,
  virtual,
  onVirtualChange,
}) {

  function toggleCategory(category) {
    onCategoriesChange((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      }

      return [...prev, category];
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Pop up a warning if Filter is clicked with no filter options selected.
    if (!searchTerm.trim() && selectedCategories.length === 0 && !openNow) {
      alert('Please select at least one filter option.');
      return;
    }

    console.log('Filters submitted');
  }

  return (
    <Card title="Filters">
      <div className="space-y-4 p-4">
        <form onSubmit={handleSubmit} id="frm-filter" className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="q" className="block text-sm font-medium text-gray-700">
              Search
            </label>
            <input
              id="q"
              type="text"
              placeholder="Try: tutoring, mental health, bursary"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
              onChange={(e) => onSearchChange(e.target.value)}
              value={searchTerm}
            />
          </div>
          {/* <p className="text-sm text-base-content/70">
            Searching for: {searchTerm}
          </p> */}

          <hr className="border-gray-200" />

          <div className="space-y-2">
            <div className="text-sm font-semibold text-gray-800">Category</div>
            <div className="flex flex-wrap gap-2" aria-label="Category filters">
              {['All', 'Academic', 'Wellness', 'Financial', 'Tech'].map((label) => (
                <button
                  key={label}
                  type="button"
                  className={`${selectedCategories.includes(label) && 'bg-sky-600 text-white'} rounded border border-sky-600 px-3 py-1 text-xs font-semibold text-sky-700 hover:bg-sky-50 hover:text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-200`}
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
                className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600 accent-sky-600"
                checked={openNow}
                onChange={(e) => onOpenNowChange(e.target.checked)}
              />
              Open now
            </label>

            {/* Have students implement state for this checkbox */}
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                id="virtual"
                className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600 accent-sky-600"
                onChange={(e) => onVirtualChange(e.target.checked)}
                value={virtual}
              />
              Virtual options
            </label>
          </div>

          <hr className="border-gray-200" />

          <div className="flex gap-2">
            <button
              type="button"
              className="rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              // First student exercise solution
              onClick={() => {
                onSearchChange('');
                onCategoriesChange([]);
                onOpenNowChange(false);
                onVirtualChange(false);
              }}
            >
              Reset
            </button>
            <button
              type="submit"
              className="rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
            >
              Filter
            </button>
            {/* <p className="text-sm">
              Open now only: {openNow ? 'Yes' : 'No'}
            </p> */}
          </div>
        </form>
      </div>
    </Card >
  );
}
