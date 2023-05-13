import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
//import 'bootstrap/dist/css/bootstrap.css';
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


ReactDOM.render(
  <Auth0Provider
    domain="dev-nblj3d35g16682v5.us.auth0.com"
    clientId="mZ2bRVklXaYCIylvEtQQ4pHPTyXAQQez"
    authorizationParams={{
	redirect_uri: window.location.origin
    }}
  >

  <App />

  </Auth0Provider>, document.getElementById("root")
);

export default App;
