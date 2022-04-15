import React, { useEffect } from 'react';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { findUserByUsername } from '../../actions/users';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import * as actionType from '../../constants/actionTypes';
import { createLoadingSelector } from '../../api/selectors';
import SocialsLink from '../shared/SocialsLink';
import {
    BackButton,
    CoverPicture,
    IndividualsContainer,
    RoleChip,
} from '../shared/muiStyles';
import Progress from '../shared/Progress';
import { getUserBirthday } from '../shared/functions';
import FavoritesWrapper from '../Favorites/Favorites';
import { motion } from 'framer-motion';
import { BsStopwatch } from 'react-icons/bs';
import { IoBalloonOutline } from 'react-icons/io5';

function Fan() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fan = useSelector((state) => state.users.user);
    const { username } = useParams();
    const loadingSelector = createLoadingSelector([actionType.USERFIND]);
    const loading = useSelector((state) => loadingSelector(state));

    useEffect(() => {
        dispatch(findUserByUsername(username));
    }, [dispatch, username]);

    return loading ? (
        <Progress />
    ) : (
        <IndividualsContainer>
            <Stack direction="row" alignItems="center" spacing={3}>
                <BackButton
                    component={motion.div}
                    whileHover={{
                        scale: 1.2,
                        transition: { duration: 0.3 },
                    }}
                    whileTap={{
                        scale: 1.25,
                        transition: { duration: 0.3 },
                    }}
                    onClick={() => navigate(-1)}
                >
                    <ArrowBackIosIcon />
                </BackButton>
                <CoverPicture
                    component="img"
                    src={fan.cover_pic ? fan.cover_pic : '/defaultPic.jpeg'}
                />
                <Button disabled sx={{ opacity: 0 }}>
                    <ArrowBackIosIcon />
                </Button>
            </Stack>

            <Stack my={1}>
                <Typography variant="h3">{fan?.nickname}</Typography>
                <Typography variant="h5">@{fan.username}</Typography>
            </Stack>

            <Box my={1}>
                <RoleChip label={fan.role}></RoleChip>
            </Box>

            {(fan?.watching_since || fan?.birthday_month) && (
                <Stack my={1}>
                    <Typography variant="h5">
                        Overview
                        <Divider />
                    </Typography>
                    <Stack spacing={1}>
                        {fan?.watching_since && (
                            <Stack
                                direction="row"
                                spacing={1}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <BsStopwatch />
                                <Typography variant="h6">
                                    Since Season {fan.watching_since}
                                </Typography>
                            </Stack>
                        )}

                        {fan?.birthday_month && (
                            <Stack
                                direction="row"
                                spacing={1}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <IoBalloonOutline />
                                <Typography variant="h6">
                                    {getUserBirthday(
                                        fan.birthday_month,
                                        fan.birthday_day
                                    )}
                                </Typography>
                            </Stack>
                        )}
                    </Stack>
                </Stack>
            )}

            <Stack my={1}>
                <Typography variant="h5">
                    Socials
                    <Divider />
                </Typography>
                {fan?.instagram || fan?.twitter || fan?.tiktok ? (
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <SocialsLink
                            platform={'instagram'}
                            username={fan?.instagram}
                        />
                        <SocialsLink
                            platform={'twitter'}
                            username={fan?.twitter}
                        />
                        <SocialsLink
                            platform={'tiktok'}
                            username={fan?.tiktok}
                        />
                    </Stack>
                ) : (
                    <Typography>No linked socials</Typography>
                )}
            </Stack>

            <FavoritesWrapper likes={fan.likes} />
        </IndividualsContainer>
    );
}

export default Fan;
