import React from "react";
import { Box, ButtonGroup, Grid, TextField } from '@mui/material';
import { Button } from '@mui/material';
import LandingPhoto from '../static/images/LandingPage2.jpg';
import { Container } from "@mui/system";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Components/LoginButton";
import LogoutButton from "../Components/LogoutButton";
import { useNavigate } from "react-router-dom";

function Login() {
  const { isAuthenticated } = useAuth0();

  /* create a login page with a button that redirects to the auth0 login page */
  const navigate = useNavigate();

  return (
    <Box
      width={'100%'}
    >
      <Box
        sx={{
          backgroundImage: `url(${LandingPhoto})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        height={{ xs: '35vh', md: '25vh' }}
      ></Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        marginY={8}
      >
        {isAuthenticated ? (
          <Button variant="contained" disableElevation onClick={() => navigate('search')}>Start searching</Button>
        ) : (
          <LoginButton></LoginButton>
        )}
        {/*<ButtonGroup variant="contained" aria-label="outlined primary button group">
          <LoginButton></LoginButton>
          <LogoutButton></LogoutButton>
      </ButtonGroup>*/}
      </Box>
    </Box>
  );
}

export default Login;
