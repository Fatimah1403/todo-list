import { useState } from 'react';
const Logon = ({ onSetEmail , onSetToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [isLoggingOn, setIsLoggingOn] = useState(false);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoggingOn(true);
        setAuthError('');
        try {
        const response = await fetch('/api/users/logon', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error(
            `Login request failed with status ${response.status}`
            );
        }

        const data = await response.json();

        if (data.name && data.csrfToken) {
            onSetEmail(data.name);
            onSetToken(data.csrfToken);
        } else {
            setAuthError('Authentication failed: Invalid server response');
        }
        } catch (error) {
        setAuthError(`Error: ${error.name} | ${error.message}`);
        } finally {
        setIsLoggingOn(false);
        }
    }
  return (
    <div>
        {authError && <p style={{ color: 'red' }}>{authError}</p>}
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
  )
}

export default Logon