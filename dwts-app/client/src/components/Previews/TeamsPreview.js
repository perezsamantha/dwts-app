import React from 'react';
import styled from 'styled-components';
import { Preview, PreviewPhoto, Names, Details } from "../shared/shared.js";

//import { makeStyles } from '@material-ui/core';

// const useStyles = makeStyles({
//     avi: {
//         width: "40px",
//         height: "40px",
//         margin: "8px auto",
//     }
// })

function TeamsPreview(props) {
    //const classes = useStyles();

    const celebFirst = props.team.celeb.split(" ");

    return (
        props.preview === "dance" ?
            <Preview>
                <SmallPhoto src={props.team.coverPic ? props.team.coverPic : "/defaultPic.jpeg"} />
                <SmallText>{celebFirst[0]} & {props.pro.name.split(" ")[0]}</SmallText>
            </Preview> : 
            <Preview>
                <PreviewPhoto src={props.team.coverPic ? props.team.coverPic : "/defaultPic.jpeg"} />
                <Names>{celebFirst[0]} & {props.pro.name.split(" ")[0]}</Names>
                <Details>Season {props.team.season} &#8226; 1st Place</Details>
            </Preview>
    )
}

const SmallPhoto = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 10px;
`;

const SmallText = styled.h3`
    font-size: 10px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.7);
    margin: 1px;
    padding: 0 5px;
    letter-spacing: 0.05em;
    color: white;
`;

export default TeamsPreview;