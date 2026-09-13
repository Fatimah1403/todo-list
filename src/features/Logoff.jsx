import { useState } from 'react';
import { useNavigate } from 'react-router';  
import { useAuth } from '../contexts/AuthContext';

function Logoff() {
  const { logout } = useAuth();
  const navigate = useNavigate();  


  const [isLoggingOff, setIsLoggingOff] = useState(false);
  const [error, setError] = useState('');

  
  async function handleLogoff() {
    setIsLoggingOff(true);
    setError('');

    const result = await logout();

    if (result.success) {
      navigate('/login'); 
    } else {
      setError(result.error);
      setIsLoggingOff(false);
    }
  }
  
  return (
    <div className="flex items-center gap-2">
      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="button"
        onClick={handleLogoff}
        disabled={isLoggingOff}
        className="rounded-md border border-slate-600 px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-slate-400 hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoggingOff ? 'Logging out...' : 'Log Out'}
      </button>
    </div>
  );
}
export default Logoff;