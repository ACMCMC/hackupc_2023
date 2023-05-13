import React from "react";
import { Box, Grid, TextField} from '@mui/material';
import { Button } from '@mui/material';
import LandingPhoto from '../static/images/LandingPage.jpg';

function Login() {
  /* create a login page with a button that redirects to the auth0 login page */
  const [text, setText] = React.useState<string>("");
  const handleOnClick = () => {
    console.log(text);
  };
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Grid item xs={10} sm={8} md={4}>
        <Box padding="2rem">
          <div>
            <img src={LandingPhoto} alt="logo" />
          <Button variant="contained" onClick={handleOnClick}>Login</Button>
          </div>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
