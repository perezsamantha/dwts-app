import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Avatar, Box } from '@mui/material';
import * as actionType from '../../constants/actionTypes';
import decode from 'jwt-decode';
import AccountSettings from './AccountSettings';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getFavoriteTeams } from '../../actions/teams';
import TeamsPreview from '../Previews/TeamsPreview';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import responsive from '../shared/responsive';
import { createLoadingSelector } from '../../api/selectors';
import { Button, Paper, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import EditAccount from './EditAccount';

function AccountHeader() {
    //const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const user = useSelector((state) => state.auth.authData.result);
    //const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //const favorites = useSelector(state => state.teams.teams);

    //const loadingSelector = createLoadingSelector([actionType.TEAMSEARCH]);
    //const isFetching = useSelector((state) => loadingSelector(state));

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });

        navigate('/');

        //setUser(null);
    };

    useEffect(() => {
        // TODO: need to fetch seasons for settings dropdown,
        // but considering will need to dispatch for favorites, might wanna wait on that
        // also, only works when no reload between signin and clicking account page since redux state does not yet reset
        //dispatch(getFavoriteTeams());
        // const token = user.token;
        // if (token) {
        //     const decodedToken = decode(token);
        //     // need to test functionality
        //     if (decodedToken.exp * 1000 < new Date().getTime()) {
        //         dispatch({ type: actionType.LOGOUT });
        //         navigate("/");
        //         setUser(null);
        //     }
        // }
        // if (user != null) {
        //     setIsLoading(false);
        // }
    }, [user, dispatch, navigate]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container>
            <AccountContainer>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    {/* temporary hack to get flexbox layout */}
                    <Button disabled sx={{ opacity: 0 }}>
                        <SettingsIcon />
                    </Button>
                    <Avatar
                        sx={{ width: 100, height: 100, marginTop: -5 }}
                        alt="default"
                        src={user.cover_pic}
                    >
                        {user.username.charAt(0)}
                    </Avatar>
                    {/* <AccountSettings /> */}
                    <Button onClick={() => setOpen(true)}>
                        <SettingsIcon />
                    </Button>
                </Box>
                <Typography variant="h4">{user.nickname}</Typography>
                <Typography variant="h5">@{user.username}</Typography>
                {user.watching_since > 0 && (
                    <Typography variant="subtitle1">
                        Watching since season {user.watching_since}
                    </Typography>
                )}

                {/* {Array.isArray(favorites) && <ContentContainer>
                    <Subtitle>Favorite Teams</Subtitle>
                    <Carousel
                        responsive={responsive}
                        partialVisible={true}
                    >
                        {favorites.map((team, index) => (

                                <Link key={index} to={{ pathname: `/teams/${team._id}` }} style={{ textDecoration: "none" }} >
                                    <TeamsPreview team={team} />
                                    
                                </Link>
                            ))}
                    </Carousel>
                </ContentContainer>} */}

                <Button variant="filled" onClick={logout}>
                    Logout
                </Button>
            </AccountContainer>

            {open && (
                <EditAccount
                    user={user}
                    open={open}
                    handleClose={handleClose}
                />
            )}
        </Container>
    );
}

const Container = styled(Paper)`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 70px;
`;

const AccountContainer = styled(Paper)`
    width: 80%;
    min-height: fit-content;
    position: relative;
    margin: 75px auto 0 auto;
    background: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    //box-shadow: 0px 0px 5px rgba(250, 250, 250, 0.1);
    align-items: center;
`;

export default AccountHeader;
