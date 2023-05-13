import React from "react";
import { Box, ButtonGroup, Grid, Stack, TextField, Typography } from '@mui/material';
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
        <Stack spacing={2} direction="column" justifyContent="center" alignItems="center" marginY={{xs: 4, md: 8}}>
        <Typography variant="h4" component="h4" marginBottom={4}>
          Welcome to MiKasa!
        </Typography>
        <Typography variant="h6" component="h6" marginBottom={8}>
          The best way to find your next home.
        </Typography>
        {isAuthenticated ? (
          <Button variant="contained" disableElevation onClick={() => navigate('search')}>Start searching</Button>
        ) : (
          <LoginButton></LoginButton>
        )}
        {/*<ButtonGroup variant="contained" aria-label="outlined primary button group">
          <LoginButton></LoginButton>
          <LogoutButton></LogoutButton>
      </ButtonGroup>*/}
        </Stack>
    </Box>
  );
}

export default Login;
