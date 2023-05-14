import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Card, Typography } from "@mui/material";
import LoginButton from "../Components/LoginButton";

const Profile = () => {
  var { user, isAuthenticated, isLoading } = useAuth0();

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
        <Typography variant="h4" component="h4" gutterBottom>
          Loading...
        </Typography>
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
          <Box
            sx={{
              backgroundImage: `url(${user?.picture})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            height={{ xs: '35vh', md: '25vh' }}
          ></Box>
          <Box
            sx={{
              padding: { xs: 2, md: 4 },
            }}
          >
            <Typography><b>Name:</b> {user?.name}</Typography>
            <Typography><b>Email:</b> {user?.email}</Typography>
          </Box>
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