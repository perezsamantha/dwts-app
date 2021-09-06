import React, { useState } from 'react';
import styled from 'styled-components';

import { Avatar, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    avi: {
        width: "40px",
        height: "40px",
        margin: "8px auto",
    }
})

function TeamsPreview(props) {
    const classes = useStyles();

    const celebFirst = props.team.celeb.split(" ");
    const proFirst = props.team.pro.split(" ");

    return (
        <div>
        <Container onClick={props.openTeam}>
            <Avatar className={classes.avi} alt="default" src={props.team.promoPic} />
            <Text>{celebFirst[0]} &</Text>
            <Text>{proFirst[0]}</Text>
            <Season>S{props.team.season}</Season>
        </Container>
        </div>
    );
}

const Container = styled.div`
    width: 75px;
    height: 150px;
    //border: 2px solid black;
    border-radius: 15px;
    //margin: 10px auto;
    box-shadow: 0px 1px 10px lightgrey;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    text-align: center;
`;

const Text = styled.h3`
    font-size: 10px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.7);
    // italicize ?
    //position: absolute;
    margin: 1px;
    padding: 0 5px;
    //padding: 12px 0 12px 55px;
    letter-spacing: 0.05em;
`;

const Season = styled.h3`
    font-size: 8px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.5);
    margin: 5px 1px;
    padding: 0 5px;
    letter-spacing: 0.05em;
`;


export default TeamsPreview;