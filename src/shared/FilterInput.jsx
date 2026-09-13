const FilterInput = ({ filterTerm, onFilterChange }) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="filterInput" className="text-slate-400 text-sm whitespace-nowrap">
        Search todos:
      </label>
      <input
        id="filterInput"
        type="text"
        value={filterTerm}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="Search by title..."
        maxLength={100}
        className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-1.5 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};

export default FilterInput;