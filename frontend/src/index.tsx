import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider
} from "react-router-dom";
import Login from './pages/LandingPage';
import SearchPage from './pages/SearchPage';

import { ThemeProvider } from '@emotion/react';
import { orange, green, indigo } from '@mui/material/colors';
import { ThemeOptions } from '@mui/material/styles';
import NavbarComponent from './Components/NavbarComponent';
import FooterComponent from './Components/FooterComponent';
import { createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Auth0Provider } from '@auth0/auth0-react';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';
//load from .env file, use env variables
// load the variables from the .env file
const REACT_APP_AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN as string;
const REACT_APP_AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID as string;


declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}


const theme = createTheme({
  palette: {
    primary: {
      main: '#F3D8C7',
      light: '#FBF3EE',
      dark: '#ECC5AC',
    },
    secondary: {
      main: '#E55934',
    },
  },
});


const router = createBrowserRouter([{
  element: (
    <Box minHeight={'100vh'}>
      <NavbarComponent />
      <Outlet />
      {/*<FooterComponent />*/}
    </Box>
  ),
  children: [
    {
      path: "/",
      element: <Login></Login>
    },
    {
      path: "/search",
      element: <SearchPage></SearchPage>,
    },
    {
      path: "/profile",
      element: <Profile></Profile>,
    },
    {
      path: "/aboutus",
      element: <AboutUs></AboutUs>,
    },
  ]
}]);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// load the domain and client id from the .env file
root.render(

  <Auth0Provider
    domain={REACT_APP_AUTH0_DOMAIN}
    clientId={REACT_APP_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();