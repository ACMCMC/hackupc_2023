import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Menu as MenuIcon } from "@mui/icons-material"

export const NavbarComponent = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" component="div">
                    MiKasa
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default NavbarComponent;