import React from "react";
import { Box, Grid, TextField, Typography } from '@mui/material';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import MikasaLogo from '../static/images/MikasaLogo.png';

function AuthenticateUser() {
    /* create a login page with a button that redirects to the auth0 login page */
    const [user, setUser] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const handleOnClick = () => {
        console.log(user, password);
    };
    return (
        <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={10} sm={8} md={4}>
                    <Box
                        paddingTop={20}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        marginBottom={4}
                    >
                      <Stack spacing={2}>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center">
                            <img width="50%" height='50%' src={MikasaLogo}></img>
                        </Box>
                      <TextField
                            id="Username_input"
                            label="Username"
                            value={user}
                            fullWidth
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setUser(event.target.value);
                            }} />
                      <TextField
                            id="Password_input"
                            label="Password"
                            value={password}
                            fullWidth
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setPassword(event.target.value);
                            }} />
                      <Button variant="contained" disabled={!(user && password)} onClick={handleOnClick}>Login</Button>
                  </Stack>
                </Box>
            </Grid>
        </Grid>

    );
}


export default AuthenticateUser;