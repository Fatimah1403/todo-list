import { useAuth } from '../contexts/AuthContext';
import Navigation from './Navigation';
import Logoff from '../features/Logoff';

const Header = () => {
    const { isAuthenticated, email } = useAuth();

    
  return (
  <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <h1 className="text-xl font-bold tracking-wide text-white">
        Todo<span className="text-indigo-400">List</span>
      </h1>

      <Navigation />

      {isAuthenticated && (
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-slate-400 sm:block">
            Welcome, {email}
          </span>

          <Logoff />
        </div>
      )}
    </div>
  </header>
);
}

export default Header