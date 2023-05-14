import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Box, Button, Stack, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import LoginButton from "../Components/LoginButton";
import LogoutButton from "../Components/LogoutButton";
import LandingPhoto from '../static/images/LandingPage2.jpg';

const AboutUs = () => {
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
        <Typography variant="h4" component="h4" gutterBottom>
          Loading...
        </Typography>
      </Box>
    );
  }

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
              Let MiKasa think on behalf of you!
            </Typography>
            <Typography variant="h6" component="h6" marginBottom={8}>
              Why are we the best way to find your next home?
              Out frontier AI technology will help you find the best home for you!
              All you need to do is to tell us what you want and we will do the rest!
              Easy to use website with a simple and intuitive interface will make sure you find your next home in no time!
              Just tell us more about yourself, your hobbies and your interests. After that MiKasa AI will anylise the real estate market and available properties to find a dream house that is suitable for you the most! 
            </Typography>
            </Stack>
        </Box>
      );
};

export default AboutUs;