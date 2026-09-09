import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function ProfilePage() {
  const {  name, token, isAuthenticated } = useAuth();

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchTodoStats() {
            if (!token) return;

            try {
            setLoading(true);
            setError('');

            const options = {
                method: 'GET',
                headers: { 'X-CSRF-TOKEN': token },
                credentials: 'include',
            };

            const response = await fetch('/api/tasks', options);

            if (response.status === 401) {
                throw new Error('Unauthorized');
            }

            if (!response.ok) {
                throw new Error('Failed to fetch todos');
            }

            const todos = await response.json();

            // Calculate statistics
            const total = todos.length;
            const completed = todos.filter((todo) => todo.isCompleted).length;
            const active = total - completed;
            setStats({ total, completed, active });
            } catch (err) {
            setError(`Error loading statistics: ${err.message}`);
            } finally {
            setLoading(false);
            }
        }

        fetchTodoStats();
    }, [token]);

    const completionPercentage =
        stats.total > 0
            ? Math.round((stats.completed / stats.total) * 100)
            : 0;
    if (!token || !isAuthenticated) {
    return (
        <div>
        <h2>Profile</h2>
        <p>Please log in to view your profile and todo statistics.</p>
        </div>
    );
    }
    return (
    <div>
      <h2>Profile</h2>

      <section>
        <h3>Account Information</h3>

        {/* CHANGED: provide useful account feedback in either state */}
        <p>Name: {name || 'Not available'}</p>

        <p>
          Status: {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
        </p>
      </section>

      <section>
        <h3>Todo Statistics</h3>

        {/* CHANGED: authentication is part of the page flow */}
        {!token || !isAuthenticated ? (
          <p>Please log in to view your todo statistics.</p>
        ) : loading ? (
          <p>Loading statistics...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <>
            <p>Total Todos: {stats.total}</p>
            <p>Completed Todos: {stats.completed}</p>
            <p>Active Todos: {stats.active}</p>

            {stats.total > 0 && (
              <p>Completion: {completionPercentage}%</p>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default ProfilePage;