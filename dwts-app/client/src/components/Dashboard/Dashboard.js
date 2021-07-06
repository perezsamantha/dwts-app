import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function Dashboard() {
    const [value, setValue] = useState('home');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <div>
            <h2>Dashboard</h2>
            <BottomNavigation value={value} onChange={handleChange}>
                <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
                <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
                <BottomNavigationAction label="Search" value="search" icon={<SearchIcon />} />
                <BottomNavigationAction label="Account" value="account" icon={<AccountCircleIcon />} />
            </BottomNavigation>
        </div>
    );
}

export default Dashboard;