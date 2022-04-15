import React, { useState, useEffect } from 'react';
import { Avatar, Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { BsThreeDots } from 'react-icons/bs';
import SocialsLink from '../shared/SocialsLink';
import FavoritesWrapper from '../Favorites/Favorites';
import AccountInfo from './AccountInfo';
import Progress from '../shared/Progress';
import { getUserBirthday } from '../shared/functions';
import {
    AccountContainer,
    AccountWrapper,
    RoleChip,
} from '../shared/muiStyles';
import { BsStopwatch } from 'react-icons/bs';
import { IoBalloonOutline } from 'react-icons/io5';

function AccountHeader(props) {
    const user = useSelector((state) => state.auth.authData);
    const loading = useSelector((state) => state.loading.AUTHFETCH);
    const [open, setOpen] = useState(false);

    useEffect(() => {}, []);

    const handleClose = () => {
        setOpen(false);
    };

    return loading || !Object.keys(user).includes('id') ? (
        <Progress />
    ) : (
        <AccountWrapper>
            <AccountContainer elevation={3} sx={{ borderRadius: 10 }}>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Button disabled sx={{ opacity: 0 }}>
                        <BsThreeDots style={{ width: 25, height: 25 }} />
                    </Button>
                    <Avatar
                        sx={{ width: 125, height: 125, marginTop: -8 }}
                        alt="default"
                        src={user.cover_pic}
                    >
                        {user.username.charAt(0)}
                    </Avatar>
                    <Button onClick={() => setOpen(true)}>
                        <BsThreeDots style={{ width: 25, height: 25 }} />
                    </Button>
                </Box>

                <Stack my={1}>
                    <Typography variant="h3">{user?.nickname}</Typography>
                    <Typography variant="h5">@{user.username}</Typography>
                </Stack>

                <Box my={1}>
                    <RoleChip label={user.role}></RoleChip>
                </Box>

                {(user?.watching_since || user?.birthday_month) && (
                    <Stack my={1}>
                        <Typography variant="h5">
                            Overview
                            <Divider />
                        </Typography>
                        <Stack spacing={1}>
                            {user?.watching_since && (
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <BsStopwatch />
                                    <Typography variant="h6">
                                        Since Season {user.watching_since}
                                    </Typography>
                                </Stack>
                            )}

                            {user?.birthday_month && (
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <IoBalloonOutline />
                                    <Typography variant="h6">
                                        {getUserBirthday(
                                            user.birthday_month,
                                            user.birthday_day
                                        )}
                                    </Typography>
                                </Stack>
                            )}
                        </Stack>
                    </Stack>
                )}

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
        </AccountWrapper>
    );
}

export default AccountHeader;
