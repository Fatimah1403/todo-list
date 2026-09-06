import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function ProfilePage() {
  const { email, token } = useAuth();

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;

    const fetchTodoStats = async () => {
      try {
        const response = await fetch('/api/tasks?limit=100', {
          headers: {
            'X-CSRF-TOKEN': token,
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch todo statistics');
        }

        const data = await response.json();
        const todos = data.tasks;

        const completed = todos.filter(
          (todo) => todo.isCompleted
        ).length;

        const total = todos.length;
        const active = total - completed;

        setStats({
          total,
          completed,
          active,
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTodoStats();
  }, [token]);

  return (
    <div>
      <h2>Profile</h2>

      <p>User: {email}</p>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <section>
        <h3>Todo Statistics</h3>
        <p>Total Todos: {stats.total}</p>
        <p>Completed Todos: {stats.completed}</p>
        <p>Active Todos: {stats.active}</p>
      </section>
    </div>
  );
}

export default ProfilePage;