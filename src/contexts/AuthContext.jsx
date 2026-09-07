import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export function AuthProvider({ children }) {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [name, setName] = useState('');

  
  const login = async (userEmail, password) => {
    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, password }),
        credentials: 'include',
      };

      const res = await fetch('/api/users/logon', options);
      const data = await res.json();
      console.log({data});


      if (res.status === 200 && data.email && data.csrfToken) {
        setEmail(data.email);
        setName(data.name);
        setToken(data.csrfToken);
        return { success: true };
      } else {
        return {
          success: false,
          error: `Authentication failed: ${data?.message}`,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Network error during login',
      };
    }
  };

  const logout = async () => {
  if (!token) {
    setEmail('');
    setToken('');
    return { success: true };
  }

  let apiSuccess = true; 

  try {
        const response = await fetch('/api/users/logoff', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        });
        if (!response.ok) {
        apiSuccess = false;
        }
    } catch (error) {
        console.error('Logout API error:', error);
        apiSuccess = false;
    } finally {
        setEmail('');
        setToken('');
    }

    return apiSuccess
        ? { success: true }
        : { success: false, error: 'Logout API call failed, but local session cleared' };
    };

  const value = {
    email,
    token,
    isAuthenticated: !!token,
    login,
    logout,
    name,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}