import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Avatar, Box, Card, Divider } from '@mui/material';
import * as actionType from '../../constants/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import { createLoadingSelector } from '../../api/selectors';
import { Button, Paper, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import EditAccount from './EditAccount';
import Favorites from '../Favorites/Favorites';
import { celebs, fans, pros } from '../Dashboard/Birthdays/sampleData';
import * as searchType from '../../constants/searchTypes';

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
    };

    useEffect(() => {
        // TODO: need to fetch seasons for settings dropdown,
        // but considering will need to dispatch for favorites, might wanna wait on that
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container>
            <AccountContainer elevation={4} sx={{ borderRadius: 10 }}>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    {/* temporary hack to get flexbox layout */}
                    <Button disabled sx={{ opacity: 0 }}></Button>
                    <Avatar
                        sx={{ width: 100, height: 100, marginTop: -8 }}
                        alt="default"
                        src={user.cover_pic}
                    >
                        {user.username.charAt(0)}
                    </Avatar>
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

                <Button variant="filled" onClick={() => navigate('/admin')}>
                    Admin Panel
                </Button>
                <Button variant="contained" onClick={logout}>
                    Logout
                </Button>
                <Divider />

                <Box sx={{ width: '100%' }} mb={2}>
                    <Typography my={1} variant="h4">
                        Favorites
                    </Typography>

                    <Typography mt={2} variant="h5">
                        Pros
                    </Typography>
                    <Favorites arr={pros} type={searchType.PROS} />

                    <Typography mt={2} variant="h5">
                        Teams
                    </Typography>
                    <Favorites arr={celebs} type={searchType.TEAMS} />

                    <Typography mt={2} variant="h5">
                        Dances
                    </Typography>
                    <Favorites arr={fans} type={searchType.DANCES} />
                </Box>
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

const Container = styled(Box)`
    /* width: 100%;
    min-height: 100vh; */
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const AccountContainer = styled(Paper)({
    width: '90%',
    marginTop: 50,
    padding: 15,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});
// width: 90%;
// margin: 4rem auto 0 auto;
// //border-radius: 50%;
// display: flex;
// flex-direction: column;
// //box-shadow: 0px 0px 5px rgba(250, 250, 250, 0.1);
// align-items: center;
// padding: 1rem;

export default AccountHeader;
