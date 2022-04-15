import React, { useEffect } from 'react';
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useDispatch, useSelector } from 'react-redux';
import { findDanceById } from '../../actions/dances';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { likeDance } from '../../actions/dances';
import * as tableType from '../../constants/tableTypes';
import {
    convertPlacement,
    getFullName,
    getSeasonAndWeek,
    getTotalScore,
} from '../shared/functions';
import ExtraPicUpload from '../shared/ExtraPicUpload';
import { createLoadingSelector } from '../../api/selectors';
import * as actionType from '../../constants/actionTypes';
import { BackButton, IndividualsContainer } from '../shared/muiStyles';
import Progress from '../shared/Progress';
import Likes from '../shared/Likes';
import DanceLink from '../shared/DanceLink';
import PicturesGrid from './Supporting/PicturesGrid';
import DancerPreview from './Supporting/DancerPreview';
import { motion } from 'framer-motion';

function Dance() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.authData);
    const dance = useSelector((state) => state.dances.dance);
    const { id } = useParams();

    const ro = convertPlacement(dance.running_order);

    const loadingSelector = createLoadingSelector([actionType.DANCEFIND]);
    const loading = useSelector((state) => loadingSelector(state));

    useEffect(() => {
        dispatch(findDanceById(id));
    }, [dispatch, id]);

    return loading || Number(dance?.id) !== Number(id) ? (
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
                <Box
                    sx={{ width: 175, height: 125, display: 'flex' }}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography
                        variant="h2"
                        fontFamily="YesMargo, Urbanist, Roboto, Helvetica Neue, sans-serif"
                        textTransform="uppercase"
                    >
                        {dance.style}
                    </Typography>
                </Box>
                <Box>
                    <Button
                        sx={{
                            '&.MuiButtonBase-root:hover': {
                                bgcolor: 'transparent',
                            },
                        }}
                        component={motion.div}
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.3 },
                        }}
                        whileTap={{
                            scale: 1.5,
                            transition: { duration: 0.3 },
                        }}
                        onClick={() => dispatch(likeDance(id))}
                    >
                        <Likes user={user} likes={dance.likes} />
                    </Button>
                    <Typography variant="subtitle1">
                        {dance.likes?.length}
                    </Typography>
                </Box>
            </Stack>

            <Stack mb={1} spacing={1}>
                <Typography variant="h5">
                    {getSeasonAndWeek(dance.episode)}
                </Typography>
                <Typography variant="h5">
                    {getTotalScore(dance.scores)}
                </Typography>
            </Stack>

            <Stack my={1}>
                <Typography variant="h5">
                    Overview
                    <Divider />
                </Typography>

                {dance?.song_title && (
                    <Typography>Song - {dance.song_title}</Typography>
                )}
                {dance?.song_artist && (
                    <Typography>Artist - {dance.song_artist}</Typography>
                )}

                {dance?.running_order && (
                    <Typography my={1}>Running Order - {ro}</Typography>
                )}

                {dance?.episode?.theme && (
                    <Typography>{dance.episode.theme} Night</Typography>
                )}
            </Stack>

            <Stack my={1} alignItems="center">
                <Typography variant="h5">
                    Danced by
                    <Divider />
                </Typography>

                <Grid container justifyContent="center" spacing={1}>
                    {dance?.dancers.map((dancer, index) =>
                        dancer.team_id ? (
                            <Grid key={index} item>
                                <Link
                                    to={{
                                        pathname: `/teams/${dancer.team_id}`,
                                    }}
                                    style={{
                                        textDecoration: 'inherit',
                                        color: 'inherit',
                                    }}
                                >
                                    <DancerPreview
                                        dancer={dancer}
                                        type={'team'}
                                    />
                                </Link>
                            </Grid>
                        ) : dancer.pro_id ? (
                            <Grid key={index} item>
                                <Link
                                    to={{
                                        pathname: `/pros/${dancer.pro_id}`,
                                    }}
                                    style={{
                                        textDecoration: 'inherit',
                                        color: 'inherit',
                                    }}
                                >
                                    <DancerPreview
                                        dancer={dancer}
                                        type={'pro'}
                                    />
                                </Link>
                            </Grid>
                        ) : dancer.celeb_id ? (
                            <Grid key={index} item>
                                <DancerPreview dancer={dancer} type={'celeb'} />
                            </Grid>
                        ) : (
                            <></>
                        )
                    )}
                </Grid>
            </Stack>

            <Stack my={1}>
                <Typography variant="h5">
                    Judges Scores
                    <Divider />
                </Typography>

                {dance?.scores.length === 0 ? (
                    <Typography>No scores yet for this dance</Typography>
                ) : (
                    <>
                        {dance.scores.map((score, index) => (
                            <Box key={index}>
                                <Typography>
                                    {getFullName(score.judge)} - {score.value}
                                </Typography>
                                {/* * or similar for guest judge */}
                            </Box>
                        ))}
                    </>
                )}
            </Stack>

            <Stack my={1}>
                <Typography variant="h5">
                    Link
                    <Divider />
                </Typography>

                {dance?.link ? (
                    <DanceLink link={dance.link} />
                ) : (
                    <Typography>No link yet for this dance</Typography>
                )}
            </Stack>

            {dance?.extra && (
                <Stack my={1}>
                    <Typography variant="h5">
                        Notes
                        <Divider />
                    </Typography>

                    <Typography>{dance.extra}</Typography>
                </Stack>
            )}

            <Stack my={1}>
                <Typography variant="h5">
                    Pictures
                    <Divider />
                </Typography>

                {dance?.pictures ? (
                    <PicturesGrid pictures={dance.pictures} />
                ) : (
                    <Typography mb={1}>
                        No pictures yet for this dance
                    </Typography>
                )}

                {user?.role === 'admin' && (
                    <ExtraPicUpload id={dance.id} type={tableType.DANCE} />
                )}
            </Stack>
        </IndividualsContainer>
    );
}

export default Dance;
