import React from "react";
import { Box, Grid, TextField, Typography} from '@mui/material';
import { Button } from '@mui/material';
import LandingPhoto from '../static/images/LandingPage.jpg';
import Stack from '@mui/material/Stack';

function Login() {
  /* create a login page with a button that redirects to the auth0 login page */
  const [text, setText] = React.useState<string>("");
  const handleOnClick = () => {
    console.log(text);
  };
  return (
    <Stack spacing={2}>
        <Box
            paddingTop={10}
            display="flex"
            justifyContent="center"
            alignItems="center">
                <img width='1000vh' height='300vh' src={LandingPhoto}></img>
        </Box>
            
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center">
                <Stack spacing={2}>
                    
                    <h1>Find your dream home</h1>
                    <Button size="large" variant="contained" onClick={handleOnClick}>Login</Button>
                </Stack>
        </Box>
    </Stack>
  );
}

export default Login;
