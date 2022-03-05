import React, { useState } from 'react';

import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import styled from 'styled-components';

function BottomNavBar() {
    //const pathname = window.location.pathname;
    //const [value, setValue] = useState(pathname.split("/")[1]);
    const pathname = localStorage.getItem('parentPath');
    const [value, setValue] = useState(pathname?.split('/')[1]);

    if (
        value !== 'dashboard' &&
        value !== 'overview' &&
        value !== 'search' &&
        value !== 'account'
    ) {
        setValue('home');
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <NavBarContainer elevation={4}>
            <BottomNavigation value={value} onChange={handleChange}>
                <BottomNavigationAction
                    disableRipple
                    component={Link}
                    to="/dashboard"
                    //label="Home"
                    value="dashboard"
                    icon={<HomeIcon />}
                />
                <BottomNavigationAction
                    disableRipple
                    component={Link}
                    to="/overview"
                    //label="Overview"
                    value="overview"
                    icon={<LeaderboardIcon />}
                />
                <BottomNavigationAction
                    disableRipple
                    component={Link}
                    to="/search"
                    //label="Search"
                    value="search"
                    icon={<SearchIcon />}
                />
                {/* <BottomNavigationAction
                    disableRipple
                    component={Link}
                    to="/notifications"
                    //label="Search"
                    value="search"
                    icon={<NotificationsIcon />}
                /> */}
                <BottomNavigationAction
                    disableRipple
                    component={Link}
                    to="/account"
                    //label="Account"
                    value="account"
                    icon={<AccountBoxIcon />}
                />
            </BottomNavigation>
        </NavBarContainer>
    );
}

const NavBarContainer = styled(Paper)`
    bottom: 0;
    position: fixed;
    width: 100%;
`;

export default BottomNavBar;
