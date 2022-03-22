import React from 'react';
import { Typography } from '@mui/material';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';
import { MainContainer, Page } from '../components/shared/muiStyles';

function Notifications() {
    localStorage.setItem('parentPath', window.location.pathname);

    return (
        <Page>
            <MainContainer>
                <Typography variant="h3">Activity?</Typography>
            </MainContainer>
            <BottomNavBar />
        </Page>
    );
}

export default Notifications;
