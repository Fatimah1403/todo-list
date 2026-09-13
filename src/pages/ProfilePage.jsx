import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function ProfilePage() {
  const { name, email, token, isAuthenticated } = useAuth();
  const [stats, setStats] = useState({ total: 0, completed: 0, active: 0 });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTodoStats() {
      if (!token) { setLoading(false); return; }
      try {
        setLoading(true);
        const response = await fetch('/api/tasks?limit=100', {
          headers: { 'X-CSRF-TOKEN': token },
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to fetch todos');
        const data = await response.json();
        const todos = Array.isArray(data) ? data : data.tasks || [];
        const total = todos.length;
        const completed = todos.filter(t => t.isCompleted).length;
        setStats({ total, completed, active: total - completed });
      } catch (err) {
        setError(`Error loading statistics: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchTodoStats();
  }, [token]);

  const pct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">Profile</h2>

        <section className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Account</h3>
          <div className="space-y-2">
            <p className="text-slate-300 text-sm">
              <span className="text-slate-500">Name: </span>{name || 'Not available'}
            </p>
            <p className="text-slate-300 text-sm">
              <span className="text-slate-500">Email: </span>{email || 'Not available'}
            </p>
            <p className="text-slate-300 text-sm">
              <span className="text-slate-500">Status: </span>
              <span className={isAuthenticated ? 'text-green-400' : 'text-red-400'}>
                {isAuthenticated ? '● Authenticated' : '● Not Authenticated'}
              </span>
            </p>
          </div>
        </section>

        <section className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Todo Statistics</h3>
          {loading && <p className="text-slate-400 text-sm">Loading statistics...</p>}
          {error && <p className="text-red-400 text-sm">{error}</p>}
          {!loading && !error && (
            <>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Total', value: stats.total, color: 'text-white' },
                  { label: 'Active', value: stats.active, color: 'text-yellow-400' },
                  { label: 'Done', value: stats.completed, color: 'text-green-400' },
                ].map(s => (
                  <div key={s.label} className="bg-slate-900 rounded-xl p-4 text-center border border-slate-700">
                    <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                    <div className="text-slate-500 text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              {stats.total > 0 && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Completion</span>
                    <span className="text-white font-medium">{pct}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-indigo-500 h-2 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )}
              {stats.total === 0 && (
                <p className="text-slate-400 text-sm">No todos yet. Add some!</p>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}

export default ProfilePage;