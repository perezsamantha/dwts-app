import React from 'react';
import { Typography } from '@mui/material';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';
import { MainContainer, Page } from '../components/shared/muiStyles';
import Announcement from '../components/Activity/Announcement';
import RecentLikes from '../components/Activity/RecentLikes';
import DanceCard from '../components/Activity/DanceCard';

function Activity() {
    localStorage.setItem('parentPath', window.location.pathname);

    return (
        <Page>
            <MainContainer>
                <Typography
                    variant="h2"
                    fontFamily="YesMargo"
                    textTransform="uppercase"
                >
                    Activity
                </Typography>

                <RecentLikes />

                <DanceCard />

                <Announcement />
            </MainContainer>
            <BottomNavBar />
        </Page>
    );
}

export default Activity;
