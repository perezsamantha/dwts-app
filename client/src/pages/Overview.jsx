import { Typography } from '@mui/material';
import React from 'react';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';
import { MainContainer, Page } from '../components/shared/muiStyles';
import SeasonsOverview from '../components/Overview/Seasons/SeasonsOverview';
import TourOverview from '../components/Overview/Tours/TourOverview';
//import TopTens from '../components/Overview/FanFavs/TopTens';
import StatisticsOverview from '../components/Overview/Statistics/StatisticsOverview';

function Overview() {
    localStorage.setItem('parentPath', window.location.pathname);

    return (
        <Page>
            <MainContainer>
                <Typography variant="h4">Overview</Typography>

                <SeasonsOverview />

                <TourOverview />

                {/* <TopTens /> */}

                <StatisticsOverview />
            </MainContainer>
            <BottomNavBar />
        </Page>
    );
}

export default Overview;
