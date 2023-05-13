import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Menu as MenuIcon } from "@mui/icons-material"
import { useNavigate } from "react-router-dom";

export const NavbarComponent = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" component="div" onClick={() => navigate('')}>
                    MiKasa
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default NavbarComponent;