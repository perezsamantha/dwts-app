import React, { Component } from 'react';
import styled from 'styled-components';
import { Avatar, withStyles } from '@material-ui/core';
import * as actionType from '../../constants/actionTypes';
import decode from 'jwt-decode';


const useStyles = ({
    avi: {
        width: "100px",
        height: "100px",
        marginTop: "-50px",
        position: "relative",
    }
})

class AccountHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('profile')),
        }
    };

    componentDidMount() {
        const { history, dispatch } = this.props;
        const token = this.user?.token;

        if (token) {
            const decodedToken = decode(token);

            // need to test functionality
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }

        const logout = () => {
            dispatch({ type: actionType.LOGOUT });

            history.push("/");

            this.setState({ user: null });
        }

        
    };

    render() {
        const { classes } = this.props;
        const user = this.state.user;
        //console.log(user);

        return (
            <Container>
                <Background>

                </Background>
                <AccountContainer>
                    <Avatar className={classes.avi} alt="default" src={user.result.profilePic}>{user.result.email.charAt(0)}</Avatar>
                    <Username>{user.result.email}</Username> 
                    {user.result.watchingSince > 0 && <StatsText>Watching since season {user.result.watchingSince}</StatsText>}
                </AccountContainer>
            </Container>
        );
    };
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

const Username = styled.h4`
    font-size: 20px;
    font-weight: 500;
    margin: 0.5em auto;
    color: black;
`;

const StatsText = styled.h4`
    font-size: 10px;
    font-weight: 500;
    margin: 0.2em auto;
    color: grey;
`;

//export default AccountHeader;
export default withStyles(useStyles)(AccountHeader);