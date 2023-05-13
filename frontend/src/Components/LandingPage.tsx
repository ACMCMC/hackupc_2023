import React from "react";
import { Box, ButtonGroup, Grid, TextField } from '@mui/material';
import { Button } from '@mui/material';
import LandingPhoto from '../static/images/LandingPage.jpg';
import { Container } from "@mui/system";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

function Login() {
  const { loginWithRedirect, logout } = useAuth0();

  /* create a login page with a button that redirects to the auth0 login page */
  const [text, setText] = React.useState<string>("");
  const handleOnClick = () => {
    console.log(text);
  };
  const containerStyle = {
    backgroundImage: `url(${LandingPhoto})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  };
  return (
    <Container style={containerStyle}>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <LoginButton></LoginButton>
        <LogoutButton></LogoutButton>
      </ButtonGroup>
    </Container>
  );
}

export default Login;
