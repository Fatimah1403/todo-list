import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <div>
      <h2>404 - Page Not Found</h2>

      <p>
        The page you are looking for does not exist. Use one of the links below
        to return to the app.
      </p>

      <nav>
        <Link to="/">Home</Link>
        {' | '}
        <Link to="/todos">Todos</Link>
        {' | '}
        <Link to="/profile">Profile</Link>
        {' | '}
        <Link to="/about">About</Link>
      </nav>
    </div>
  );
}

export default NotFoundPage;