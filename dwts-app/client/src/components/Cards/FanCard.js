import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Avatar, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { findUserById } from '../../actions/fans';

import { Container, TeamName } from '../shared/shared.js';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    avi: {
        width: '75px',
        height: '75px',
        marginTop: '15px',
        position: 'relative',
    },
    icons: {
        color: 'lightgrey',
    },
    button: {
        margin: '0',
        padding: '0',
        maxWidth: '20px',
    },
});

function FanCard() {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const fan = useSelector((state) => state.fans.fans);
    const { id } = useParams();

    useEffect(() => {
        dispatch(findUserById(id));
    }, [dispatch, id]);

    return Array.isArray(fan) ? (
        <div>insert loading bar</div>
    ) : (
        <Container>
            <Button className={classes.back} onClick={() => navigate(-1)}>
                <ArrowBackIosIcon className={classes.icons} />
            </Button>
            <Avatar className={classes.avi} alt="default" />
            <Username>@{fan.username}</Username>
        </Container>
    );
}

const Username = styled.h4`
    font-size: 20px;
    font-weight: 500;
    margin: 0.5em auto;
    color: white;
`;

export default FanCard;
