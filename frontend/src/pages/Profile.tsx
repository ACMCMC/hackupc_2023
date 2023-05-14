import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Typography } from "@mui/material";
import LoginButton from "../Components/LoginButton";
import LogoutButton from "../Components/LogoutButton";

const Profile = () => {
  var { user, isAuthenticated, isLoading, logout } = useAuth0();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80vh'
        }}
      >
      <CircularProgress />
      </Box>
    );
  }
  /*
    isAuthenticated = true;
    user = {
      name: "abc",
      email: "hdkeurh",
      picture: "fhkreyhfgki"
    }
  */
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh'
      }}
    >
      {isAuthenticated ? (
        <Card
          variant="outlined"
        >
          <CardMedia
            sx={{ height: 140 }}
            image={user?.picture}
          />
          <CardContent>
            <Box
              sx={{
                //padding: { xs: 2, md: 4 },
              }}
            >
              <Typography><b>Name:</b> {user?.name}</Typography>
              <Typography><b>Email:</b> {user?.email}</Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button variant="text" onClick={() => logout()}>Logout</Button>
          </CardActions>
        </Card>
      ) : (
        <Card
          variant="outlined"
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            padding={4}
          >
            <Typography variant="h4" component="h4" gutterBottom>
              You're not logged in!
            </Typography>
            <LoginButton></LoginButton>
          </Box>
        </Card>
      )
      }
    </Box >
  );
};

export default Profile;