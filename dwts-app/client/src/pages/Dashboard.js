import { Box, Switch, Typography } from '@mui/material';
import React from 'react';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';
import Birthdays from '../components/Dashboard/Birthdays/Birthdays';
import styled from '@emotion/styled';

function Dashboard(props) {
    localStorage.setItem('parentPath', window.location.pathname);

    const { toggleDark, handleDarkMode } = props;

    return (
        <Box>
            <ContentContainer>
                <Switch
                    checked={toggleDark}
                    onChange={() => handleDarkMode(!toggleDark)}
                />
                <Typography variant="h4">Home Page</Typography>
                <Birthdays />
            </ContentContainer>
            <BottomNavBar />
        </Box>
    );
}

const ContentContainer = styled(Box)`
    padding: 1rem;
    padding-bottom: 70px;
`;

export default Dashboard;
