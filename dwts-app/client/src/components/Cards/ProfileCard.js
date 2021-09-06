import React from 'react';
import styled from 'styled-components';
import { Avatar, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    avi: {
        width: "75px",
        height: "75px",
        marginTop: "15px",
        position: "relative",
    }
})

function ProfileCard(props) {
    const classes = useStyles();
    return (
        <Container>
            <Avatar className={classes.avi} alt="default" />
            <Username>@{props.username}</Username>
        </Container>
    );
}

const Container = styled.div`
    width: 70%;
    min-height: 300px;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
    margin: 1em auto;
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    background: white;
    border: none;
    border-radius: 15px;
`;

const Username = styled.h4`
    font-size: 20px;
    font-weight: 500;
    margin: 0.5em auto;
    color: black;
`;

//export default ProfileCard;
export default ProfileCard;