import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Typography } from "@mui/material";
import LoginButton from "../Components/LoginButton";

const Profile = () => {
  var { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
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
    //returns boolean - return component 
    <>
    {isAuthenticated && (
      <div>
        <img src={user?.picture} alt={user?.name} />
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
      </div>
    )}
    {!isAuthenticated && (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}
      >
      {/* Add a centered box that displays an empty card with the text 'You're not logged in' and prompts the user to log in with a button*/}
        <Typography variant="h4" component="h4" gutterBottom>
          You're not logged in!
        </Typography>
        <LoginButton></LoginButton>
      </Box>
    )}
    </>
  );
};

export default Profile;