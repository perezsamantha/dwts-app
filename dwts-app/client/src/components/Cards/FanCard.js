import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Avatar, Button, makeStyles } from "@material-ui/core";
import CheckJWT from "../shared/logout";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { findFanById } from "../../actions/fans";

import { Container, TeamName } from '../shared/shared.js'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles({
    avi: {
        width: "75px",
        height: "75px",
        marginTop: "15px",
        position: "relative",
    },
    icons: {
        color: "lightgrey",
    },
    button: {
        margin: "0",
        padding: "0",
        maxWidth: "20px",
    },
})

function FanCard() {
    CheckJWT();
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const fan = useSelector(state => state.fans.fans);
    const { id } = useParams();

    useEffect(() => {
        dispatch(findFanById(id));
    }, [dispatch, id])

    return (
        (Array.isArray(fan)) ? <div>insert loading bar</div> :
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