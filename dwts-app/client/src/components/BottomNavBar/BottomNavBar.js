import React, { useState } from 'react';
//import { BottomNavigation, BottomNavigationAction, makeStyles } from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import CheckJWT from '../shared/logout';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    stickToBottom: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        zIndex: 1000,
    },
    root : {
        color: "grey",
    },
    selected: {
        //color: "white !important",
        //color: "rgb(250,240,190) !important",
        fontFamily: "Urbanist"
    },
})

function BottomNavBar() {
    CheckJWT();
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
            <BottomNavigation value={value} onChange={handleChange} className={classes.stickToBottom}>
                <BottomNavigationAction classes={{ root: classes.root, selected: classes.selected }} disableRipple component={Link} to="/dashboard" label="Home" value="dashboard" icon={<HomeIcon />} />
                <BottomNavigationAction classes={{ root: classes.root, selected: classes.selected }} disableRipple component={Link} to="/favorites" label="Favorites" value="favorites" icon={<FavoriteIcon />} />
                <BottomNavigationAction classes={{ root: classes.root, selected: classes.selected }} disableRipple component={Link} to="/search/dances" label="Search" value="search" icon={<SearchIcon />} />
                <BottomNavigationAction classes={{ root: classes.root, selected: classes.selected }} disableRipple component={Link} to="/account" label="Account" value="account" icon={<AccountCircleIcon />} />
            </BottomNavigation>
    );
}

export default BottomNavBar;