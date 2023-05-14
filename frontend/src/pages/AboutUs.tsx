import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Box, Button, Stack, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import LoginButton from "../Components/LoginButton";
import LogoutButton from "../Components/LogoutButton";
import AboutPhoto from '../static/images/AboutUs.jpg';

export const AboutUs = () => {

    return (
        <Box
          width={'100%'}
        >
          <Box
            sx={{
              backgroundImage: `url(${AboutPhoto})`,
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
              <h1 style = {{ "padding": "5%"}}>Why are we the best way to find your next home?  </h1> 
              <p style = {{ "padding": "5%"}}>Out frontier AI technology will help you find the best home for you.  </p> 
              <p style = {{ "padding": "5%"}}>All you need to do is to tell us what you want and we will do the rest!  </p> 
              <p style = {{ "padding": "5%"}}>Easy to use website with a simple and intuitive interface will make sure you find your next home in no time.  </p> 
              <p style = {{ "padding": "5%"}}>Just tell us more about yourself, your hobbies and your interests. </p> 
              <p style = {{ "padding": "5%"}}>After that MiKasa AI will anylise the real estate market and available properties to find a dream house that is suitable for you the most! </p> 
              <h1 style = {{ "padding": "5%"}}>JAAZ team - HackUPC 2023  </h1> 
              <p style = {{ "padding": "5%"}}>@AOrps</p>
              <p style = {{ "padding": "5%"}}>@acmcmc</p>
              <p style = {{ "padding": "5%"}}>@JoachimStanislaus</p>
              <p style = {{ "padding": "5%"}}>@ZacharyB1</p>


            </Typography>
            </Stack>
        </Box>
      );
};

export default AboutUs;