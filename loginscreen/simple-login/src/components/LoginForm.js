import React, { useState } from 'react';
import './LoginForm.css';

function LoginForm({ Login, error }) {
  const [details, setDetails] = useState({ name: '', password: '' });

  const submitHandler = (e) => {
    e.preventDefault();
    Login(details);
  };

  return (
    <section className="form-main">
      <div className="form-outer">
        <img
          className="logo-main"
          src={require('../assets/002_RG_2021_FULL_LOCKUP_RED.png')}
          alt="Riot games logo"
        />
        <h2 className="sign-in">Sign in</h2>
        {error !== '' ? (
          <div className="error-shadow">
            <span className="error-box">
              <span className="error-msg">{error}</span>
            </span>
          </div>
        ) : (
          ''
        )}
        <form onSubmit={submitHandler} className="form-inner">
          <div className="form-group">
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
          <div className="login-btn-container">
            <div className="login-btn-wrapper">
              <input className="login-btn" type="submit" value="LOGIN" />
            </div>
          </div>
        </form>
        <ul className="login-routes">
          <button className="button-fb">
            <img
              className="fblogo"
              src={require('../assets/fbicon.png')}
              alt="fb login"
            />
          </button>
          <button className="button-google">
            <img
              className="googlelogo"
              src={require('../assets/googleicon.png')}
              alt="google login"
            />
          </button>
          <button className="button-apple">
            <img
              className="applelogo"
              src={require('../assets/appleicon.png')}
              alt="apple login"
            />
          </button>
        </ul>
        <label className="stay-container">
          <input type="checkbox" value="stay" />
          Stay signed in
          <span className="checkmark"></span>
        </label>
      </div>
      <footer className="bottom-section">
        <div>
          <a href="https://recovery.riotgames.com/en?region=NA1">
            can't sign in?
          </a>
        </div>
        <div>
          <a href="https://signup.leagueoflegends.com/en-gb/signup/index">
            create account
          </a>
        </div>
        <div className="version">V57.0.0</div>
      </footer>
    </section>
  );
}

export default LoginForm;
