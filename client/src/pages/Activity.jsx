import React from 'react';
import { Typography } from '@mui/material';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';
import { MainContainer, Page } from '../components/shared/muiStyles';
import Announcement from '../components/Activity/Announcement';
import RecentLikes from '../components/Activity/RecentLikes';
import DanceCard from '../components/Activity/DanceCard';
import PollCard from '../components/Activity/Polls/PollCard';
import RecentScores from '../components/Activity/RecentScores';

function Activity() {
    localStorage.setItem('parentPath', window.location.pathname);

    return (
        <Page>
            <MainContainer>
                <Typography align="center" variant="h4">
                    Activity
                </Typography>

                <Announcement />

                <RecentScores />

                <RecentLikes />

                <DanceCard />

                <PollCard />
            </MainContainer>
            <BottomNavBar />
        </Page>
    );
}

export default Activity;
