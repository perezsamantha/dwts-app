import React from 'react';
import { Typography } from '@mui/material';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';
import { MainContainer, Page } from '../components/shared/muiStyles';
import Announcement from '../components/Activity/Announcement';
import Summary from '../components/Activity/Summary';
import DanceCard from '../components/Activity/DanceCard';

function Activity() {
    localStorage.setItem('parentPath', window.location.pathname);

    return (
        <Page>
            <MainContainer>
                <Typography variant="h3">Activity</Typography>

                <Summary />

                <DanceCard />

                <Announcement />
            </MainContainer>
            <BottomNavBar />
        </Page>
    );
}

export default Activity;
