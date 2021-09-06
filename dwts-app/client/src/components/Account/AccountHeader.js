import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Avatar, makeStyles, Button } from '@material-ui/core';
import * as actionType from '../../constants/actionTypes';
import decode from 'jwt-decode';
import AccountSettings from './AccountSettings';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles({
    avi: {
        width: "100px",
        height: "100px",
        marginTop: "-50px",
        position: "relative", 
    }
})

function AccountHeader() {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();

    const logout = () => {
            dispatch({ type: actionType.LOGOUT });

            history.push("/");

            setUser(null);
        }

    useEffect(() => {
        const token = user.token;

        if (token) {
            const decodedToken = decode(token);

            // need to test functionality
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                dispatch({ type: actionType.LOGOUT });

                history.push("/");

                setUser(null);
            }
        }

        if(user != null) {
            setIsLoading(false);
        }
    }, [user, dispatch, history]);

    return (
        (!isLoading ? <Container>
            <Background>

            </Background>
            <AccountContainer>
                <Avatar className={classes.avi} alt="default" src={user.result.profilePic}>{user.result.username.charAt(0)}</Avatar>
                <Username>{user.result.username}</Username>
                {user.result.watchingSince > 0 && <StatsText>Watching since season {user.result.watchingSince}</StatsText>}
                <AccountSettings />
                <Button variant="outlined" color="primary" onClick={logout}>
                    Logout
                </Button>
            </AccountContainer>
        </Container> : <div>uhm we-</div>)
    );
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

export default AccountHeader;
