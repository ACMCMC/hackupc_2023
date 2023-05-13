import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Auth0Provider } from '@auth0/auth0-react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
	  Fuck it we ball "{process.env.REACT_APP_HELLO}"
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

/*

  <Auth0Provider
    domain="{process.env.REACT_APP_AUTH0_DOMAIN}"
    clientId="{process.env.REACT_APP_AUTH0_CLIENT_ID}"
    authorizationParams={{
	redirect_uri: window.location.origin
    }}
  >
*/
export default App;
