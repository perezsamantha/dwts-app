import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
    Avatar,
    Box,
    Button,
    Divider,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import 'react-multi-carousel/lib/styles.css';
import { BsThreeDots } from 'react-icons/bs';
import SocialsLink from '../shared/SocialsLink';
import FavoritesWrapper from '../Favorites/Favorites';
import AccountInfo from './AccountInfo';
import Progress from '../shared/Progress';

function AccountHeader(props) {
    const user = useSelector((state) => state.auth.authData);
    //const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);

    useEffect(() => {}, []);

    const handleClose = () => {
        setOpen(false);
    };

    return !Object.keys(user).includes('id') ? (
        <Progress />
    ) : (
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
                    <Button onClick={() => setOpen(true)} color="inherit">
                        <BsThreeDots
                            style={{
                                width: '60%',
                                height: '60%',
                            }}
                        />
                    </Button>
                </Box>

                <Typography variant="h4">{user.nickname}</Typography>
                <Typography variant="h5">@{user.username}</Typography>

                {user.watching_since > 0 && (
                    <Typography variant="subtitle1">
                        Watching since season {user.watching_since}
                    </Typography>
                )}

                <Divider />

                <Stack my={1}>
                    <Typography variant="h5">Socials</Typography>
                    <Divider />
                    {user.instagram || user.twitter || user.tiktok ? (
                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <SocialsLink
                                platform={'instagram'}
                                username={user.instagram}
                            />
                            <SocialsLink
                                platform={'twitter'}
                                username={user.twitter}
                            />
                            <SocialsLink
                                platform={'tiktok'}
                                username={user.tiktok}
                            />
                        </Stack>
                    ) : (
                        <Typography>No linked socials</Typography>
                    )}
                </Stack>

                <FavoritesWrapper likes={user.likes} />
            </AccountContainer>

            {open && (
                <AccountInfo
                    user={user}
                    open={open}
                    handleClose={handleClose}
                    toggleDark={props.toggleDark}
                    handleDarkMode={props.handleDarkMode}
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
