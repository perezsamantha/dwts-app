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
        //padding: '0 1em'
    }
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
                <BottomNavigationAction component={Link} to="/dashboard" label="Home" value="/dashboard" icon={<HomeIcon />} />
                <BottomNavigationAction component={Link} to="/favorites" label="Favorites" value="/favorites" icon={<FavoriteIcon />} />
                <BottomNavigationAction component={Link} to="/search" label="Search" value="/search" icon={<SearchIcon />} />
                <BottomNavigationAction component={Link} to="/account" label="Account" value="/account" icon={<AccountCircleIcon />} />
            </BottomNavigation>
        </div>
    );
}

export default BottomNavBar;