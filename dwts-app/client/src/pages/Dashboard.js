import { Switch } from '@mui/material';
import React from 'react';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';

function Dashboard(props) {
    localStorage.setItem('parentPath', window.location.pathname);

    const { toggleDark, handleDarkMode } = props;

    return (
        <div>
            <Switch
                checked={toggleDark}
                onChange={() => handleDarkMode(!toggleDark)}
            />
            <h2>Home Page</h2>
            <BottomNavBar />
        </div>
    );
}

export default Dashboard;
