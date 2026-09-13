import { useSearchParams } from 'react-router';

function StatusFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentStatus = searchParams.get('status') || 'all';

  const handleStatusChange = (status) => {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (status === 'all') {
      nextSearchParams.delete('status');
    } else {
      nextSearchParams.set('status', status);
    }

    setSearchParams(nextSearchParams);
  };

  return (
    <div className="w-full">
      <label
        htmlFor="statusFilter"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Show
      </label>

      <select
        id="statusFilter"
        value={currentStatus}
        onChange={(e) => handleStatusChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      >
        <option value="all">All Todos</option>
        <option value="active">Active Todos</option>
        <option value="completed">Completed Todos</option>
      </select>
    </div>
  );
}

export default StatusFilter;