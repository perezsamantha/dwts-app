import { Typography } from '@mui/material';
import React from 'react';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';
import { MainContainer, Page } from '../components/shared/muiStyles';
import SeasonsOverview from '../components/Overview/Seasons/SeasonsOverview';
import TourOverview from '../components/Overview/Tours/TourOverview';
import StatisticsOverview from '../components/Overview/Statistics/StatisticsOverview';

function Overview() {
    localStorage.setItem('parentPath', window.location.pathname);

    return (
        <Page>
            <MainContainer>
                <Typography
                    variant="h2"
                    fontFamily="YesMargo"
                    textTransform="uppercase"
                >
                    Overview
                </Typography>

                <SeasonsOverview />

                <TourOverview />

                <StatisticsOverview />
            </MainContainer>
            <BottomNavBar />
        </Page>
    );
}

export default Overview;
