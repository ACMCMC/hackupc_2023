import React from "react";
import { Box, Grid, TextField, Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Container } from "@mui/system";

//const Login = (email: string, pass: string, auth0) => {

//}

function AuthenticateUser() {
    // create a login page with a button that redirects to the auth0 login page /
    // const { loginWithRedirect } = useAuth0();

    const [user, setUser] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const handleOnClick = () => {
        console.log(user, password);
    };
    return (
        <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={10} sm={8} md={4}>
                <Box>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        marginBottom={4}
                    >
                        <Typography typography={'h5'} fontWeight={'bold'}>Login</Typography>
                    </Box>
                    <Box
                        marginBottom={2}
                    >
                        <TextField
                            id="Username_input"
                            label="Username"
                            value={user}
                            fullWidth
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setUser(event.target.value);
                            }} />
                    </Box>
                    <Box
                        marginBottom={4}
                    >
                        <TextField
                            id="Password_input"
                            label="Password"
                            value={password}
                            fullWidth
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setPassword(event.target.value);
                            }} />
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Button variant="contained" disabled={!(user && password)} onClick={handleOnClick}>Login</Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>

    );
}


export default AuthenticateUser;


