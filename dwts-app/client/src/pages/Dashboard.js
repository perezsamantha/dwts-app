import { Switch } from '@mui/material';
import React from 'react';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';

function Dashboard(props) {
    localStorage.setItem('parentPath', window.location.pathname);

    const setToggleDark = props.setToggleDark;
    const toggleDark = props.toggleDark;

    const handleMode = () => {
        setToggleDark(!toggleDark);
    }

    return (
        <div>
            <Switch checked={toggleDark} onChange={handleMode} />
            <h2>Home Page</h2>
            <BottomNavBar />
        </div>
    )
}

export default Dashboard;