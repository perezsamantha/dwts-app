import React, { useEffect } from 'react';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { findDanceById } from '../../actions/dances';
import { useParams, Link } from 'react-router-dom';
import { likeDance } from '../../actions/dances';
import * as tableType from '../../constants/tableTypes';
import {
    convertPlacement,
    getAverageUserScore,
    getFullName,
    getSeasonAndWeek,
    getTotalScore,
} from '../shared/functions';
import ExtraPicUpload from '../shared/ExtraPicUpload';
import { createLoadingSelector } from '../../api/selectors';
import * as actionType from '../../constants/actionTypes';
import { IndividualsContainer } from '../shared/muiStyles';
import Progress from '../shared/Progress';
//import DanceLink from '../shared/DanceLink';
import PicturesGrid from './Supporting/PicturesGrid';
import DancerPreview from './Supporting/DancerPreview';
import IndividualsHeader from './Supporting/IndividualsHeader';

import ReactPlayer from 'react-player';
import Scoring from '../shared/Scoring';

function Dance() {
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

    const handleLike = () => {
        dispatch(likeDance(id));
    };

    return loading || Number(dance?.id) !== Number(id) ? (
        <Progress />
    ) : (
        <IndividualsContainer>
            <IndividualsHeader
                user={user}
                item={dance}
                handleLike={handleLike}
                type="dance"
            />

            <Stack mb={1} spacing={1}>
                <Typography variant="h5">
                    {getSeasonAndWeek(dance.episode)}
                </Typography>
                <Typography variant="h5">
                    {getTotalScore(dance.scores)}
                </Typography>
            </Stack>

            <Stack my={1} width={1} alignItems="center">
                <Typography variant="h5">
                    Overview
                    <Divider />
                </Typography>

                {dance?.song_title && (
                    <Typography>
                        {dance.song_title}{' '}
                        {dance?.song_artist && `by ${dance.song_artist}`}
                    </Typography>
                )}

                {dance?.episode?.theme && (
                    <Typography>{dance.episode.theme} Night</Typography>
                )}

                {dance?.running_order && (
                    <Typography>Running Order - {ro}</Typography>
                )}
            </Stack>

            <Stack my={1} alignItems="center">
                <Typography variant="h5">
                    Danced By
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

            <Stack my={1} width={1} alignItems="center">
                <Typography variant="h5">
                    Judges Scores
                    <Divider />
                </Typography>

                {dance?.scores.length === 0 ? (
                    <Typography>No scores for this dance</Typography>
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

            <Stack my={1} width={1} alignItems="center">
                <Typography variant="h5">
                    Fans Score <Divider />
                </Typography>
                {dance.user_scores.length > 0 ? (
                    <Typography fontSize={20}>
                        {getAverageUserScore(dance.user_scores)}
                    </Typography>
                ) : (
                    <Typography>No fans score yet for this dance</Typography>
                )}

                <Typography mt={2}>Your Score</Typography>

                <Box alignItems="center">
                    <Scoring />
                </Box>
            </Stack>

            <Stack my={1} width={1} alignItems="center">
                <Typography variant="h5">
                    Link
                    <Divider sx={{ width: 45 }} />
                </Typography>

                {dance?.link &&
                dance.link.startsWith('https://www.dailymotion') ? (
                    <Box my={1}>
                        <iframe
                            src={
                                'https://geo.dailymotion.com/player.html?video=' +
                                dance.link.slice(34)
                            }
                            style={{
                                width: '100%',
                                height: '100%',
                                border: 'none',
                            }}
                            allowFullScreen
                            title="Dailymotion Video Player"
                            allow="web-share"
                        ></iframe>
                    </Box>
                ) : dance?.link ? (
                    <Box my={1}>
                        <Box
                            sx={{
                                position: 'relative',
                                paddingTop: '56.25%',
                                minWidth: '350px',
                            }}
                        >
                            <ReactPlayer
                                url={dance.link}
                                width="100%"
                                height="100%"
                                light
                                controls
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    transform: 'none',
                                    margin: '0',
                                }}
                            />
                        </Box>
                    </Box>
                ) : (
                    <Typography>No link yet for this dance</Typography>
                )}
            </Stack>

            {dance?.extra && (
                <Stack my={1} width={1} alignItems="center">
                    <Typography variant="h5">
                        Notes
                        <Divider />
                    </Typography>

                    <Typography>{dance.extra}</Typography>
                </Stack>
            )}

            <Stack my={1} width={1} alignItems="center">
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
