import React, { useState } from 'react';
import './LoginForm.css';

function LoginForm({ Login, error }) {
  const [details, setDetails] = useState({ name: '', password: '' });

  const submitHandler = (e) => {
    e.preventDefault();
    Login(details);
  };

  return (
    <form onSubmit={submitHandler} className="form-main">
      <div className="form-inner">
        <logo className="logo-main">LOGO here!!</logo>
        <h2 className="sign-in">Sign In</h2>
        {error !== '' ? <div className="error">{error}</div> : ''}
        <div className="form-group">
          {/* <label htmlFor="name" className="username">
            Username
          </label> */}
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            value={details.name}
            placeholder="USERNAME"
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="password">Password</label> */}
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            value={details.password}
            placeholder="PASSWORD"
          />
        </div>
        <ul className="login-routes">
          <button>FB</button>
          <button>Google</button>
          <button>Apple</button>
        </ul>
        <input type="submit" value="LOGIN IMG" />
      </div>
    </form>
  );
}

export default LoginForm;
