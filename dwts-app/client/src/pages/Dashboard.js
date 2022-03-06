import { Switch, Typography } from '@mui/material';
import React from 'react';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';
import Birthdays from '../components/Dashboard/Birthdays/Birthdays';
import { MainContainer, Page } from '../components/shared/muiStyles';

function Dashboard(props) {
    localStorage.setItem('parentPath', window.location.pathname);

    const { toggleDark, handleDarkMode } = props;

    return (
        <Page>
            <MainContainer>
                <Switch
                    checked={toggleDark}
                    onChange={() => handleDarkMode(!toggleDark)}
                />
                <Typography variant="h4">Home Page</Typography>
                <Birthdays />
            </MainContainer>
            <BottomNavBar />
        </Page>
    );
}

export default Dashboard;
