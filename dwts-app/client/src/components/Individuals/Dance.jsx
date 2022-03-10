import React, { useEffect } from 'react';
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { useDispatch, useSelector } from 'react-redux';
import { findDanceById } from '../../actions/dances';
import { useParams, useNavigate } from 'react-router-dom';

import { likeDance } from '../../actions/dances';
import * as tableType from '../../constants/tableTypes';

import { LikesContainer, CardAvatar } from '../shared/regStyles.js';

import {
    convertPlacement,
    filterScoresByDance,
    getDancersByDance,
    getFullJudgeName,
    getScoreByDance,
    getSeasonAndWeek,
} from '../shared/functions';
import ExtraPicUpload from '../shared/ExtraPicUpload';

import { createLoadingSelector } from '../../api/selectors';

import * as actionType from '../../constants/actionTypes';
import { IndividualsContainer } from '../shared/muiStyles';
import Progress from '../shared/Progress';
import Likes from '../shared/Likes';
import DanceLink from '../shared/DanceLink';
import PicturesGrid from './Supporting/PicturesGrid';
import DancerPreview from './Supporting/DancerPreview';

function Dance() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const dance = useSelector((state) => state.dances.dance);
    const { id } = useParams();

    const ro = convertPlacement(dance.running_order);

    const loadingSelector = createLoadingSelector([
        actionType.DANCEFIND,
        actionType.FETCHALLDATA,
    ]);
    const loading = useSelector((state) => loadingSelector(state));

    const scores = useSelector((state) => state.scores.scores);
    const episodes = useSelector((state) => state.episodes.episodes);
    const judges = useSelector((state) => state.judges.judges);
    const dancers = useSelector((state) => state.dancers.dancers);

    useEffect(() => {
        dispatch(findDanceById(id));
    }, [dispatch, id]);

    let seasonAndWeek = '';
    let totalScore = 0;
    let filteredScores,
        filteredDancers = [];

    if (!loading) {
        seasonAndWeek = getSeasonAndWeek(dance, episodes);
        filteredScores = filterScoresByDance(dance, scores);
        totalScore = getScoreByDance(dance, filteredScores);
        filteredDancers = getDancersByDance(dance, dancers);
    }

    return loading || Number(dance?.id) !== Number(id) ? (
        <Progress />
    ) : (
        <IndividualsContainer>
            <Stack direction="row">
                <Button onClick={() => navigate(-1)}>
                    <ArrowBackIosIcon />
                </Button>
                <CardAvatar src={'/defaultPic.jpeg'} />
                <LikesContainer>
                    <Button onClick={() => dispatch(likeDance(id))}>
                        <Likes user={user} likes={dance.likes} />
                    </Button>
                    <Typography variant="subtitle1">
                        {dance.likes?.length}
                    </Typography>
                </LikesContainer>
            </Stack>

            <Stack mb={1} spacing={1}>
                <Typography variant="h4">{dance.style}</Typography>
                <Typography variant="h5">{seasonAndWeek}</Typography>
                <Typography variant="h5">{totalScore}</Typography>
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

                {dance?.theme && <Typography>{dance.theme} Week</Typography>}

                {/* maybe getTheme ? */}
            </Stack>

            <Stack my={1} alignItems="center">
                <Typography variant="h5">
                    Danced by
                    <Divider />
                </Typography>

                <Grid container justifyContent="center" spacing={1}>
                    {filteredDancers.map((dancer, index) =>
                        dancer.team_id ? (
                            <Grid key={index} item>
                                <DancerPreview dancer={dancer} type={'team'} />
                            </Grid>
                        ) : dancer.pro_id ? (
                            <Grid key={index} item>
                                <DancerPreview dancer={dancer} type={'pro'} />
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

                {filteredScores.length === 0 ? (
                    <Typography>No scores yet for this dance 💔</Typography>
                ) : (
                    <>
                        {filteredScores.map((score, index) => (
                            <Box key={index}>
                                <Typography>
                                    {getFullJudgeName(score.judge_id, judges)} -{' '}
                                    {score.value}
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
                    <Typography>No link yet for this dance 💔</Typography>
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
                        No pictures yet for this dance 💔
                    </Typography>
                )}

                <ExtraPicUpload id={dance.id} type={tableType.DANCE} />
            </Stack>
        </IndividualsContainer>
    );
}

export default Dance;
