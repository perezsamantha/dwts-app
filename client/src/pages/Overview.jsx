import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';
import { MainContainer, Page } from '../components/shared/muiStyles';
import { useDispatch, useSelector } from 'react-redux';
import * as actionType from '../constants/actionTypes';
import { getAllData } from '../actions/multipleActions';
import Progress from '../components/shared/Progress';
import { createLoadingSelector } from '../api/selectors';
import SeasonsOverview from '../components/Overview/Seasons/SeasonsOverview';
import TourOverview from '../components/Overview/Tours/TourOverview';
import StatisticsOverview from '../components/Overview/Statistics/StatisticsOverview';

function Overview() {
    localStorage.setItem('parentPath', window.location.pathname);
    const dispatch = useDispatch();

    const loadingSelector = createLoadingSelector([actionType.FETCHALLDATA]);
    const loading = useSelector((state) => loadingSelector(state));

    useEffect(() => {
        dispatch(getAllData());
    }, [dispatch]);

    return (
        <Page>
            {loading ? (
                <Progress />
            ) : (
                <MainContainer>
                    <Typography variant="h3">Overview</Typography>

                    <SeasonsOverview />

                    <TourOverview />

                    <StatisticsOverview />
                </MainContainer>
            )}
            <BottomNavBar />
        </Page>
    );
}

export default Overview;
