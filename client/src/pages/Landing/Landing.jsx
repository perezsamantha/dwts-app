import { Box } from '@mui/material';
import React from 'react';
import LandingWrapper from '../../components/Landing/LandingWrapper';

function Landing() {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <LandingWrapper />
        </Box>
    );
}

export default Landing;
