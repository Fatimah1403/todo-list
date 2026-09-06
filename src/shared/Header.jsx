import { useAuth } from '../contexts/AuthContext';
import Navigation from './Navigation';
import Logoff from '../features/Logoff';

const Header = () => {
    const { isAuthenticated, email } = useAuth();

    
  return (
    <header>
      <h1>Todo List</h1>
      <Navigation />
      {isAuthenticated && (
        <div>
          <span>Welcome, {email}</span>
          
          <Logoff/>
        </div>
      )}
    </header>
  );
}

export default Header