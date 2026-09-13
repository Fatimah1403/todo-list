import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

function HomePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/todos', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-slate-50">
      <div className="text-center">
        <div
          className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"
          aria-hidden="true"
        />

        <p className="mt-4 text-sm font-medium text-slate-500">
          Redirecting...
        </p>
      </div>
    </main>
  );
}

export default HomePage;