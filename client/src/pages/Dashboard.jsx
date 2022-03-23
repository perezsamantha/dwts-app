import React from 'react';
import { Typography } from '@mui/material';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';
import Birthdays from '../components/Dashboard/Birthdays/Birthdays';
import DailyDances from '../components/Dashboard/DailyDances/DailyDances';
import Introduction from '../components/Dashboard/Intro/Introduction';
import Throwbacks from '../components/Dashboard/Throwbacks/Throwbacks';
import { MainContainer, Page } from '../components/shared/muiStyles';

function Dashboard() {
    localStorage.setItem('parentPath', window.location.pathname);

    return (
        <Page>
            <MainContainer>
                <Typography variant="h3">Welcome</Typography>

                <Introduction />

                <Birthdays />

                <DailyDances />

                <Throwbacks />
            </MainContainer>
            <BottomNavBar />
        </Page>
    );
}

export default Dashboard;