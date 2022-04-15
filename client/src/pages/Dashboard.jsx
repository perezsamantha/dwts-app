import React from 'react';
import { Typography } from '@mui/material';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';
import BirthdaysCard from '../components/Dashboard/Birthdays/BirthdaysCard';
import DailyDanceWrapper from '../components/Dashboard/DailyDances/DailyDanceWrapper';
import Introduction from '../components/Dashboard/Intro/Introduction';
import { MainContainer, Page } from '../components/shared/muiStyles';
import ThrowbackCard from '../components/Dashboard/Throwbacks/ThrowbackCard';

function Dashboard() {
    localStorage.setItem('parentPath', window.location.pathname);

    return (
        <Page>
            <MainContainer>
                <Typography
                    variant="h2"
                    fontFamily="YesMargo"
                    textTransform="uppercase"
                >
                    Dashboard
                </Typography>

                <Introduction />

                <BirthdaysCard />

                <DailyDanceWrapper />

                <ThrowbackCard />
            </MainContainer>
            <BottomNavBar />
        </Page>
    );
}

export default Dashboard;
