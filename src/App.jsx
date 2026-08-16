import Header from './shared/Header';
import TodosPage from './features/Todos/TodosPage';
import { useState } from 'react';
import Logon from './features/logon';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  return (
    <div>
     <Header
      token={token}
      onSetEmail={setEmail}
      onSetToken={setToken}
    />
    {token ? (
      <TodosPage token={token} />
    ) : (
      <Logon 
        onSetEmail={setEmail} 
        onSetToken={setToken} 
      />
    )}
    </div>
  );
}
    

export default App;