import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';

function Overview() {
    localStorage.setItem('parentPath', window.location.pathname);

    return (
        <Box>
            <Typography variant="h4">Overview / Stats Page</Typography>
            <Typography variant="h5">
                Number of perfect scores per pro
            </Typography>
            <Typography variant="h5">Number of finals per pro</Typography>
            <Typography variant="h5">Number of wins per pro</Typography>
            <Typography variant="h5">Highest first week scores</Typography>
            <Typography variant="h5">Earliest perfect scores</Typography>
            <BottomNavBar />
        </Box>
    );
}

export default Overview;
