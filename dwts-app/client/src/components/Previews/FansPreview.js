import React from 'react';
import styled from 'styled-components';

import { Avatar, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    avi: {
        width: "40px",
        height: "40px",
        position: "relative",
        margin: "auto 0 auto 8px",
    }
})


function FansPreview(props) {
    const classes = useStyles();
    // eventually need to bring in src file for avi

    return (
        <Container onClick={props.openProfile}>
            <Avatar className={classes.avi} alt="default" />
            <Text>@{props.user}</Text>
        </Container>
    );
}

const Container = styled.div`
    width: 70%;
    height: 50px;
    //border: 2px solid black;
    border-radius: 25px;
    margin: 10px auto;
    box-shadow: 0px 1px 10px lightgrey;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
`;

const Text = styled.h3`
    font-size: 20px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.7);
    // italicize ?
    position: absolute;
    margin: 1px;
    padding: 12px 0 12px 55px;
    letter-spacing: 0.05em;
`;


export default FansPreview;