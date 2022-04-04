import React, { useEffect } from 'react';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { findUserById } from '../../actions/users';

import { CardAvatar } from '../shared/regStyles.js';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import * as actionType from '../../constants/actionTypes';
import { createLoadingSelector } from '../../api/selectors';
import SocialsLink from '../shared/SocialsLink';
import { IndividualsContainer } from '../shared/muiStyles';
import Progress from '../shared/Progress';
import { FaBirthdayCake } from 'react-icons/fa';
import { getMonthAndDay } from '../shared/functions';
import FavoritesWrapper from '../Favorites/Favorites';

function Fan() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fan = useSelector((state) => state.users.user);
    const { id } = useParams();
    const loadingSelector = createLoadingSelector([actionType.USERFIND]);
    const loading = useSelector((state) => loadingSelector(state));

    useEffect(() => {
        dispatch(findUserById(id));
    }, [dispatch, id]);

    return loading ? (
        <Progress />
    ) : (
        <IndividualsContainer>
            <Stack direction="row">
                <Button onClick={() => navigate(-1)}>
                    <ArrowBackIosIcon />
                </Button>
                <CardAvatar
                    src={fan.cover_pic ? fan.cover_pic : '/defaultPic.jpeg'}
                />
                <Button disabled></Button>
            </Stack>

            <Stack mt={1} mb={2}>
                <Typography variant="h3">{fan?.nickname}</Typography>
                <Typography variant="h5">@{fan.username}</Typography>
            </Stack>

            {(fan?.watching_since || fan?.birthday) && (
                <Stack my={1}>
                    <Typography variant="h5">
                        Overview
                        <Divider />
                    </Typography>
                    <Stack spacing={1}>
                        <Typography variant="h6">Watching since S1</Typography>
                        <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <FaBirthdayCake />
                            <Typography variant="h6">
                                {getMonthAndDay(fan?.birthday)}
                            </Typography>
                        </Stack>
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
                    <Typography>User has no linked socials 💔</Typography>
                )}
            </Stack>

            <FavoritesWrapper likes={fan.likes} />
        </IndividualsContainer>
    );
}

export default Fan;
