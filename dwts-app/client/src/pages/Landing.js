import { Paper } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import AccountBox from '../components/AccountBox/AccountBox';

//import { AccountBox } from '../components/AccountBox/AccountBox';

function Landing() {
    return (
        <Paper>
            <AccountBox />
        </Paper>
    );
}

const LandingContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export default Landing;
