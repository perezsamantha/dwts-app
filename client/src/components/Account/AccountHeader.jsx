import React, { useState, useEffect } from 'react';
import {
    Avatar,
    Box,
    Button,
    Chip,
    Divider,
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
import { getUserBirthday } from '../shared/functions';
import { FaBirthdayCake } from 'react-icons/fa';
import { AccountContainer, AccountWrapper } from '../shared/muiStyles';

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
        <AccountWrapper>
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

                <Box my={1}>
                    <Chip label={user.role} color="primary"></Chip>
                </Box>

                {(user?.watching_since || user?.birthday_month) && (
                    <Stack my={1}>
                        <Typography variant="h5">
                            Overview
                            <Divider />
                        </Typography>
                        <Stack spacing={1}>
                            {user?.watching_since && (
                                <Typography variant="h6">
                                    Watching since season {user.watching_since}
                                </Typography>
                            )}

                            {user?.birthday_month && (
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <FaBirthdayCake />
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
