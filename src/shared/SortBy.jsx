const SortBy = ({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,
}) => {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      
      <div>
        <label
          htmlFor="sortBy"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Sort by
        </label>

        <select
          id="sortBy"
          value={sortBy}
          onChange={(event) =>
            onSortByChange(event.target.value)
          }
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        >
          <option value="createdAt">Created At</option>
          <option value="title">Title</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="sortDirection"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Order
        </label>

        <select
          id="sortDirection"
          value={sortDirection}
          onChange={(event) =>
            onSortDirectionChange(event.target.value)
          }
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </div>
  );
};

export default SortBy;