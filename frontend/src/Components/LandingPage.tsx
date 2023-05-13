import React from "react";
import { Box, Grid, TextField} from '@mui/material';
import { Button } from '@mui/material';
import LandingPhoto from '../static/images/LandingPage.jpg';
import { Container } from "@mui/system";

function Login() {
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
          <div>
          <Button variant="contained" onClick={handleOnClick}>Login</Button>
          </div>
        </Container>
  );
}

export default Login;
