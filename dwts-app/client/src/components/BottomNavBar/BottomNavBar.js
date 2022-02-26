import React, { useState } from 'react';
//import { BottomNavigation, BottomNavigationAction, makeStyles } from '@material-ui/core';

import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import CheckJWT from '../shared/logout';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import styled from 'styled-components';


const useStyles = makeStyles({
    
})

function BottomNavBar() {
    //CheckJWT();
    const classes = useStyles();
    //const pathname = window.location.pathname;
    //const [value, setValue] = useState(pathname.split("/")[1]);
    const pathname = localStorage.getItem('parentPath');
    const [value, setValue] = useState(pathname?.split("/")[1]);

    if (value != "dashboard" && value != "favorites" && value != "search" && value != "account") {
        setValue("home");
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <NavBarContainer elevation={4}>
            <BottomNavigation value={value} onChange={handleChange} >
                <BottomNavigationAction disableRipple component={Link} to="/dashboard" label="Home" value="dashboard" icon={<HomeIcon />} />
                <BottomNavigationAction disableRipple component={Link} to="/favorites" label="Favorites" value="favorites" icon={<FavoriteIcon />} />
                <BottomNavigationAction disableRipple component={Link} to="/search/dances" label="Search" value="search" icon={<SearchIcon />} />
                <BottomNavigationAction disableRipple component={Link} to="/account" label="Account" value="account" icon={<AccountCircleIcon />} />
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