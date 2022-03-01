import React from 'react';
import styled from 'styled-components';

import { Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    avi: {
        width: '40px',
        height: '40px',
        position: 'relative',
        margin: 'auto 0 auto 8px',
    },
});

function FansPreview(props) {
    const classes = useStyles();
    // eventually need to bring in src file for avi

    return (
        <Container>
            <Avatar className={classes.avi} alt="default" />
            <InnerContainer>
                <Nickname>Nickname</Nickname>
                <Username>@{props.username}</Username>
            </InnerContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 75%;
    height: 75px;
    margin: 5px auto;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid white;
`;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto 10px;
`;

const Nickname = styled.h3`
    font-size: 20px;
    font-weight: 500;
    color: #fff;
    margin: 0;
`;

const Username = styled.h4`
    font-size: 15px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
`;

export default FansPreview;
