import React, { useEffect } from 'react';
import { Avatar, Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findProById, likePro } from '../../actions/pros';
import { createLoadingSelector } from '../../api/selectors';
import * as actionType from '../../constants/actionTypes';
import {
    convertHeight,
    getAge,
    getAveragePlacement,
    getFullName,
    getMonthDayAndYear,
    getNumberOfPerfects,
    getNumberOfTens,
    getNumberOfWins,
} from '../shared/functions';

import ExtraPicUpload from '../shared/ExtraPicUpload';
import * as tableType from '../../constants/tableTypes';
import SocialsLink from '../shared/SocialsLink';
import { IndividualsContainer } from '../shared/muiStyles';
import Progress from '../shared/Progress';
import PicturesGrid from './Supporting/PicturesGrid';
import { Link } from 'react-router-dom';
import { IoBalloonOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import IndividualsHeader from './Supporting/IndividualsHeader';

function Pro() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.authData);
    const pro = useSelector((state) => state.pros.pro);
    const { id } = useParams();

    const loadingSelector = createLoadingSelector([
        actionType.PROFIND,
        actionType.FETCHALLDATA,
    ]);
    const loading = useSelector((state) => loadingSelector(state));

    const birthday = getMonthDayAndYear(pro.birthday);
    const age = getAge(pro.birthday);

    useEffect(() => {
        dispatch(findProById(id));
    }, [dispatch, id]);

    const handleLike = () => {
        dispatch(likePro(id));
    };

    return loading || Number(pro?.id) !== Number(id) ? (
        <Progress />
    ) : (
        <IndividualsContainer>
            <IndividualsHeader
                user={user}
                item={pro}
                handleLike={handleLike}
                type="pro"
            />

            <Stack my={1}>
                <Typography variant="h4" gutterBottom>
                    {pro.first_name} {pro?.last_name}
                </Typography>
                {pro.is_junior && <Typography>Junior Pro</Typography>}
            </Stack>

            <Stack my={1}>
                <Typography variant="h5">
                    Overview
                    <Divider />
                </Typography>

                {pro?.height && (
                    <Typography variant="h6">
                        {convertHeight(pro.height)}
                    </Typography>
                )}
                {pro?.birthday && (
                    <>
                        <Typography variant="h6">{age} years old</Typography>
                        <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <IoBalloonOutline />
                            <Typography variant="h6">{birthday}</Typography>
                        </Stack>
                    </>
                )}
            </Stack>

            <Stack my={1}>
                <Typography variant="h5">
                    Stats
                    <Divider />
                </Typography>
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item>
                        <Typography variant="subtitle1">Wins</Typography>
                        <Typography variant="subtitle1">
                            {getNumberOfWins(pro.teams)}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">
                            Avg Placement
                        </Typography>
                        <Typography variant="subtitle1">
                            {getAveragePlacement(pro.teams)}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">Tens</Typography>
                        <Typography variant="subtitle1">
                            {getNumberOfTens(pro.dances)}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">Perfects</Typography>
                        <Typography variant="subtitle1">
                            {getNumberOfPerfects(pro.dances)}
                        </Typography>
                    </Grid>
                </Grid>
            </Stack>

            <Stack my={1}>
                <Typography variant="h5">
                    Socials
                    <Divider />
                </Typography>
                {pro?.instagram || pro?.twitter || pro?.tiktok ? (
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <SocialsLink
                            platform={'instagram'}
                            username={pro?.instagram}
                        />
                        <SocialsLink
                            platform={'twitter'}
                            username={pro?.twitter}
                        />
                        <SocialsLink
                            platform={'tiktok'}
                            username={pro?.tiktok}
                        />
                    </Stack>
                ) : (
                    <Typography>No linked socials</Typography>
                )}
            </Stack>

            {pro.teams.length !== 0 && (
                <Stack my={1}>
                    <Typography variant="h5">
                        Teams (In Order)
                        <Divider />
                    </Typography>

                    {pro.teams.map((team, index) => (
                        <Link
                            key={index}
                            to={{ pathname: `/teams/${team.id}` }}
                            style={{
                                textDecoration: 'inherit',
                                color: 'inherit',
                            }}
                        >
                            <Box
                                component={motion.div}
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.3 },
                                }}
                                whileTap={{
                                    scale: 1.075,
                                    transition: { duration: 0.3 },
                                }}
                                mb={1}
                            >
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                >
                                    <Box>
                                        <Avatar
                                            sx={{
                                                width: 50,
                                                height: 50,
                                            }}
                                            src={team?.cover_pic}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography>
                                            {team.season_id === '27.5'
                                                ? `Juniors`
                                                : `Season ${team.season_id}`}{' '}
                                            &#8226; {getFullName(team.celeb)}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        </Link>
                    ))}
                </Stack>
            )}

            <Stack my={1}>
                <Typography variant="h5">
                    Pictures
                    <Divider />
                </Typography>

                {pro?.pictures ? (
                    <PicturesGrid pictures={pro.pictures} />
                ) : (
                    <Typography mb={1}>No pictures yet</Typography>
                )}

                {user?.role === 'admin' && (
                    <ExtraPicUpload id={pro.id} type={tableType.PRO} />
                )}
            </Stack>
        </IndividualsContainer>
    );
}

export default Pro;
