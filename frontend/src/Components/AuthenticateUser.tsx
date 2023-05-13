import React from "react";
import { Box, Grid, TextField} from '@mui/material';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
  TextBox: {
    backgroundColor: 'red',
    color: 'red',
    '&:hover': {
      backgroundColor: 'darkred',
    },
  },
});

function AuthenticateUser(){
    /* create a login page with a button that redirects to the auth0 login page */
    const classes = useStyles();
    const [user, setUser] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const handleOnClick = () => {
        console.log(user,password);
      };
    return(
      
      <div>
        <TextField
          className={classes.TextBox}
          id="Username_input"
          label="Username"
          value={user}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUser(event.target.value); }} />
          <TextField
          className={classes.TextBox}
          id="Password_input"
          label="Password"
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value); }} />
          <Button variant="contained" disabled={!(user&&password)} onClick={handleOnClick}>Login</Button>  
      </div>
    );
}
   

export default AuthenticateUser;