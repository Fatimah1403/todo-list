import { useAuth } from '../contexts/AuthContext';
import Navigation from './Navigation';

const Header = () => {
    const { isAuthenticated, logout, email } = useAuth();

    const handleLogout = async () => {
      const result = await logout();
      if (!result.success) {
        alert(`Note: ${result.error}`)
      }

    
    };

  return (
    <header>
      <h1>Todo List</h1>
      <Navigation />
      {isAuthenticated && (
        <div>
          <span>Welcome, {email}</span>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      )}
    </header>
  );
}

export default Header