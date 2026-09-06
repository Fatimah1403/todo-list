import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Logon = () => {
  const { login } = useAuth();
  const [password, setPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoggingOn(true);
    setAuthError('');

   
    const result = await login(userEmail, password);

    if (!result.success) {
      setAuthError(result.error);
    }

    setIsLoggingOn(false);
  };

  return (
    <div>
      {authError && <p style={{ color: 'red' }}>{authError}</p>}
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
};

export default Logon;