import React from "react";
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import {
    AccessAlarmOutlined,
    AccountBalanceOutlined,
    AdbOutlined,
    AddOutlined,
    Search,
    AccountCircle
} from "@mui/icons-material";
import { useState } from "react";


export const FooterComponent = () => {
    const [selected, setSelected] = useState(0);
    return (
        <BottomNavigation
            value={selected}
            onChange={(value, newValue) => {
                setSelected(newValue);
            }}
            sx={{
                width: '100%'
            }}
        >
            <BottomNavigationAction label="Search" icon={<Search />} />
            <BottomNavigationAction
                label="About us"
                icon={<AccountCircle />}
            />
        </BottomNavigation>
    );
}

export default FooterComponent;