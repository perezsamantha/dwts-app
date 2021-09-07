import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Avatar, makeStyles, Button } from '@material-ui/core';
import * as actionType from '../../constants/actionTypes';
import decode from 'jwt-decode';
import AccountSettings from './AccountSettings';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getFavoriteTeams } from '../../actions/teams';
import NewPreview from '../Previews/NewPreview';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import responsive from '../shared/responsive';


const useStyles = makeStyles({
    avi: {
        width: "100px",
        height: "100px",
        marginTop: "-100px",
        position: "relative",
        alignSelf: "center"
    },
    button: {
        color: "lightgrey",
        border: "1px solid lightgrey",
        margin: "20px auto"
    }
})

function AccountHeader() {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const favorites = useSelector(state => state.teams.teams);

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });

        navigate("/");

        setUser(null);
    }

    useEffect(() => {
        dispatch(getFavoriteTeams());
        const token = user.token;

        if (token) {
            const decodedToken = decode(token);

            // need to test functionality
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                dispatch({ type: actionType.LOGOUT });

                navigate("/");

                setUser(null);
            }
        }

        if (user != null) {
            setIsLoading(false);
        }



    }, [user, dispatch, navigate]);

    return (
        (!isLoading ? <Container>
            <AccountContainer>
                <AccountSettings />
                <Avatar className={classes.avi} alt="default" src={user.result.profilePic}>{user.result.username.charAt(0)}</Avatar>
                <Username>{user.result.username}</Username>
                {user.result.watchingSince > 0 && <StatsText>Watching since season {user.result.watchingSince}</StatsText>}

                {Array.isArray(favorites) && <ContentContainer>
                    <Subtitle>Favorite Teams</Subtitle>
                    <Carousel
                        responsive={responsive}
                        partialVisible={true}
                    >
                        {favorites.map((team, index) => (

                                <Link key={index} to={{ pathname: `/teams/${team._id}` }} style={{ textDecoration: "none" }} >
                                    <NewPreview team={team} />
                                    
                                </Link>
                            ))}
                    </Carousel>
                </ContentContainer>}

                <Button className={classes.button} variant="outlined" onClick={logout}>
                    Logout
                </Button>
            </AccountContainer>
        </Container> : <div>todo: change to loading bar</div>)
    );
}

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 70px;
    background-color: rgba(18, 18, 18);
`;

// const Background = styled.div`
//     width: 100%;
//     height: 200px;
//     background-color: rgba(18, 18, 18);
//     top: 0;
//     position: relative;
//     box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.4);
//     z-index: 0;
//     //align-items: center;
// `;

const Subtitle = styled.h2`
    //float: left;
    color: rgba(0, 0, 0, 0.8);
    margin: 0 auto 15px auto;
    color: white;
`;

const ContentContainer = styled.div`
    width: 75%;
    margin: 15px auto;
`;

const AccountContainer = styled.div`
    width: 80%;
    min-height: fit-content;
    //box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
    position: relative;
    margin: 75px auto 0  auto;
    background: white;
    //z-index: 4;
    border-radius: 10px;
    //overflow: auto;
    //align-items: center;
    display: flex;
    flex-direction: column;
    background-color: rgba(30, 30, 30);
    //box-shadow: 0px 0px 5px rgba(250, 250, 250, 0.1);
`;

const Username = styled.h4`
    font-size: 20px;
    font-weight: 500;
    margin: 0.75em auto;
    color: white;
`;

const StatsText = styled.h4`
    font-size: 10px;
    font-weight: 500;
    margin: 0.2em auto;
    color: grey;
`;

export default AccountHeader;
