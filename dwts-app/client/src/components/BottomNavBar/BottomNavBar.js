import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, makeStyles } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    stickToBottom: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        zIndex: 10,
        background: "rgb(198,161,67)",
background: "linear-gradient(99deg, rgba(198,161,67,1) 0%, rgba(232,216,136,1) 55%, rgba(198,161,67,1) 100%)",
        color: "white",
        //padding: '0 1em'
    },
    root : {
        color: "white",
    },
    selected: {
        color: "white !important",
    },
})

function BottomNavBar() {
    const classes = useStyles();
    const pathname = window.location.pathname;
    const [value, setValue] = useState(pathname);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <div>
            <BottomNavigation value={value} onChange={handleChange} className={classes.stickToBottom}>
                <BottomNavigationAction classes={{ root: classes.root, selected: classes.selected }} disableRipple component={Link} to="/dashboard" label="Home" value="/dashboard" icon={<HomeIcon />} />
                <BottomNavigationAction classes={{ root: classes.root, selected: classes.selected }} disableRipple component={Link} to="/favorites" label="Favorites" value="/favorites" icon={<FavoriteIcon />} />
                <BottomNavigationAction classes={{ root: classes.root, selected: classes.selected }} disableRipple component={Link} to="/search/dances" label="Search" value="/search/dances" icon={<SearchIcon />} />
                <BottomNavigationAction classes={{ root: classes.root, selected: classes.selected }} disableRipple component={Link} to="/account" label="Account" value="/account" icon={<AccountCircleIcon />} />
            </BottomNavigation>
        </div>
    );
}

export default BottomNavBar;