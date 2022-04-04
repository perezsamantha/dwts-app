import React from 'react';
import { Typography } from '@mui/material';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';
import Birthdays from '../components/Dashboard/Birthdays/Birthdays';
import DailyDanceWrapper from '../components/Dashboard/DailyDances/DailyDanceWrapper';
import Introduction from '../components/Dashboard/Intro/Introduction';
import { MainContainer, Page } from '../components/shared/muiStyles';
import ThrowbackCard from '../components/Dashboard/Throwbacks/ThrowbackCard';

function Dashboard() {
    localStorage.setItem('parentPath', window.location.pathname);

    return (
        <Page>
            <MainContainer>
                <Typography variant="h3">Welcome</Typography>

                <Introduction />

                <Birthdays />

                <DailyDanceWrapper />

                <ThrowbackCard />
            </MainContainer>
            <BottomNavBar />
        </Page>
    );
}

export default Dashboard;
