import React, { useEffect } from 'react';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { findUserById } from '../../actions/fans';

import { CardAvatar } from '../shared/regStyles.js';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import * as actionType from '../../constants/actionTypes';
import { createLoadingSelector } from '../../api/selectors';
import SocialsLink from '../shared/SocialsLink';
import { IndividualsContainer } from '../shared/muiStyles';
import Progress from '../shared/Progress';
import { FaBirthdayCake } from 'react-icons/fa';
import Favorites from '../Favorites/Favorites';
import * as searchType from '../../constants/searchTypes';
import { celebs, fans, pros } from '../Dashboard/Birthdays/sampleData';

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
                        <Typography variant="h5">Watching since S1</Typography>
                        <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <FaBirthdayCake />
                            <Typography variant="h5">January 1st</Typography>
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
                    <Stack direction="row" spacing={2}>
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

            <Box sx={{ width: '100%' }} my={2}>
                <Stack width="fit-content" margin="auto">
                    <Typography variant="h5">Favorites</Typography>
                    <Divider />
                </Stack>

                <Typography variant="h6" align="left">
                    Pros
                </Typography>
                <Favorites arr={pros} type={searchType.PROS} />

                <Typography variant="h6" align="left">
                    Teams
                </Typography>
                <Favorites arr={celebs} type={searchType.TEAMS} />

                <Typography variant="h6" align="left">
                    Dances
                </Typography>
                <Favorites arr={fans} type={searchType.DANCES} />
            </Box>
        </IndividualsContainer>
    );
}

export default Fan;
