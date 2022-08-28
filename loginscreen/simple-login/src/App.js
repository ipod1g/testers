import { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import Hero from './components/Hero';

function App() {
  //  temp data base  //
  const adminUser = {
    username: 'probono',
    password: '1234',
  };

  // --------------- //

  const [user, setUser] = useState({ name: '' });
  const [error, setError] = useState('');

  const Login = (details) => {
    console.log(details);
    if (
      details.name === adminUser.username &&
      details.password === adminUser.password
    ) {
      console.log('Logged in');
      setUser({
        name: details.name,
      });
    } else {
      console.log(
        "Your login credentials don't match an account in our system."
      );
      setError("Your login credentials don't match an account in our system.");
    }
  };

  const Logout = () => {
    console.log('Logout');
    setUser({ name: '' });
  };

  return (
    <div className="App">
      {user.name !== '' ? (
        <div className="welcome">
          <h2>
            Welcome, <span>{user.name}</span>
          </h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
      <Hero />
    </div>
  );
}

export default App;
