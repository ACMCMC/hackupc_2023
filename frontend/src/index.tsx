import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Components/LandingPage';
import AuthenticateUser from './Components/AuthenticateUser';
import UserFind from './Components/InputWrapper';
import SearchPage from './pages/SearchPage';
import { ThemeProvider } from '@emotion/react';
import { orange, green } from '@mui/material/colors';
import { ThemeOptions } from '@mui/material/styles';
import NavbarComponent from './Components/NavbarComponent';
import FooterComponent from './Components/FooterComponent';
import { createTheme } from '@mui/material/styles';

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
      main: orange[500],
    },
    secondary: {
      main: green[500],
    },
  },
});


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>
  },
  {
    path: "/login",
    element: <AuthenticateUser></AuthenticateUser>
  },
  {
    path: "/home",
    element: <UserFind></UserFind>,
  },
  {
    path: "/search",
    element: <SearchPage></SearchPage>,
  },
]);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {router.state.location.pathname !== '/login' ? <NavbarComponent/> : <></>}
      <RouterProvider router={router} />
      <FooterComponent/>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
