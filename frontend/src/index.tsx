import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainComponent from './Components/MainComponent';
import Login from './Components/LandingPage';
import AuthenticateUser from './Components/AuthenticateUser';
import UserFind from './Components/InputWrapper';
import SearchPage from './pages/SearchPage';


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
    {router.state.location.pathname !== '/login' ? <div>NAVBAR</div> : <></>}
    <RouterProvider router={router} />
    <footer>ABC</footer>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
