import React, { Component } from 'react';
import styled from 'styled-components';
import { Avatar, withStyles } from '@material-ui/core';

const useStyles = ({
    avi: {
        width: "100px",
        height: "100px",
        marginTop: "-50px",
        position: "relative",
    }
})

class AccountHeader extends Component {

    render() {
        const { classes } = this.props;

        return (
            <Container>
                <Background>

                </Background>
                <AccountContainer>
                    <Avatar className={classes.avi} alt="default" />
                </AccountContainer>
            </Container>
        );
    }
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Background = styled.div`
    width: 100%;
    height: 200px;
    background: rgb(149,213,232);
    background: radial-gradient(circle, rgba(149,213,232,1) 0%, rgba(159,236,203,1) 100%);
    top: 0;
    position: relative;
    box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.4);
    z-index: 0;
    //align-items: center;
`;

const AccountContainer = styled.div`
    width: 80%;
    min-height: 300px;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
    position: absolute;
    margin: 5em auto 0 auto;
    background: white;
    //z-index: 4;
    border-radius: 15px;
    //overflow: auto;
    align-items: center;
    display: flex;
    flex-direction: column;
`;

//export default AccountHeader;
export default withStyles(useStyles)(AccountHeader);