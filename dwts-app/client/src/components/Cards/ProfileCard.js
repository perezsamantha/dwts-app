import React, { Component } from 'react';
import styled from 'styled-components';
import { Avatar, withStyles } from '@material-ui/core';

const useStyles = ({
    avi: {
        width: "75px",
        height: "75px",
        marginTop: "15px",
        position: "relative",
    }
})

class ProfileCard extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Container>
                <Avatar className={classes.avi} alt="default" />
                <Username>@username</Username>
            </Container>
        );
    };
};

const Container = styled.div`
    width: 70%;
    min-height: 300px;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
    margin: 1em auto;
    display: flex;
    flex-direction: column;
    position: absolute;
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
export default withStyles(useStyles)(ProfileCard);