import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

function LoginPage() {
  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [password, setPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  
  const from = location.state?.from?.pathname || '/todos';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoggingOn(true);
    setAuthError('');

    const result = await login(userEmail, password);

    if (!result.success) {
      setAuthError(result.error);
      setIsLoggingOn(false);
      return;
    }
    setIsLoggingOn(false);
  }

  return (
    <div>
      {authError && (
        <p style={{ color: 'red' }}>
          {authError}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>

          <input
            type="email"
            id="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>

          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={isLoggingOn}>
          {isLoggingOn ? 'Logging in...' : 'Log On'}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;


