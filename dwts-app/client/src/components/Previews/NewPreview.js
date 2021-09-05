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

function NewPreview(props) {
    const classes = useStyles();

    const celebFirst = props.team.celeb.split(" ");
    const proFirst = props.team.pro.split(" ");

    return (
        <Preview>
            <CoverPhoto src={props.team.promoPic} />
            <Text>{celebFirst[0]} & {proFirst[0]}</Text>
            <Season>Season {props.team.season} &#8226; 1st Place</Season>
        </Preview>
    )
}

const Preview = styled.div`
    width: 100%;
`;

const CoverPhoto = styled.img`
    width: 125px;
    height: 125px;
    border-radius: 10px;
`;

const Text = styled.h3`
    font-size: 12px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.7);
    margin: 1px;
    padding: 0 5px;
    letter-spacing: 0.05em;
    color: white;
`;

const Season = styled.h3`
    font-size: 10px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.5);
    margin: 5px 1px;
    padding: 0 5px;
    letter-spacing: 0.05em;
    color: rgb(179, 179, 179);
`;

export default NewPreview;