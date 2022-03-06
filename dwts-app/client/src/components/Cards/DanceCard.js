import React, { useState, useEffect } from 'react';
import { Button, Grid, Paper, Stack, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { useDispatch, useSelector } from 'react-redux';
import { findDanceById } from '../../actions/dances';
import { fetchTeams } from '../../actions/teams';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { likeDance } from '../../actions/dances';
import * as tableType from '../../constants/tableTypes';

import { Picture, LikesContainer, CardAvatar } from '../shared/regStyles.js';

import TeamsPreview from '../Previews/TeamsPreview';
import { convertPlacement, Likes } from '../shared/functions';
import ExtraPicUpload from '../shared/ExtraPicUpload';
import DataGetter from '../shared/DataGetter';

import { createLoadingSelector } from '../../api/selectors';

import * as actionType from '../../constants/actionTypes';
import { CardContainer } from '../shared/muiStyles';
import Progress from '../shared/Progress';

function DanceCard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const dance = useSelector((state) => state.dances.dance);
    const { id } = useParams();

    const ro = convertPlacement(dance.running_order);

    const loadingSelector = createLoadingSelector([
        actionType.DANCEFIND,
        actionType.CELEBSEARCH,
        actionType.PROSEARCH,
        actionType.TEAMSEARCH,
        actionType.SEASONSEARCH,
        actionType.EPISODESEARCH,
        actionType.DANCERSEARCH,
        actionType.JUDGESEARCH,
        actionType.SCORESEARCH,
    ]);
    const loading = useSelector((state) => loadingSelector(state));

    useEffect(() => {
        dispatch(findDanceById(id));
    }, [dispatch, id]);

    return loading || Object.keys(dance).length === 0 ? (
        <Progress />
    ) : (
        <CardContainer>
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

            {/* <Grid container justify="center" className={classes.root} spacing={2}>
                        {dance.teams.map((id, index) => (
                            <div key={index} style={{ margin: "5px" }}>
                                {Array.isArray(teams) && teams.filter(team => team._id === id)
                                    .map((team, index) => (
                                        <Grid key={index} item>
                                            <Link key={index} to={{ pathname: `/teams/${team._id}` }} style={{ textDecoration: "none" }} >
                                                <TeamsPreview team={team} preview="dance" pro={pros.find(pro => pro._id === team.pro)} />
                                            </Link>
                                        </Grid>
                                    ))}
                            </div>
                        ))}
                    </Grid> */}

            <Typography variant="h6">
                <DataGetter id={dance.episode_id} type={tableType.EPISODE} />
            </Typography>
            <Typography variant="h6">Style - {dance.style}</Typography>
            {dance?.song_title && (
                <Typography variant="h6">Song - {dance.song_title}</Typography>
            )}
            {dance?.song_artist && (
                <Typography variant="h6">
                    Artist - {dance.song_artist}
                </Typography>
            )}
            {dance?.running_order && (
                <Typography variant="h6">Running Order - {ro}</Typography>
            )}

            <Typography variant="h5">Judges Scores</Typography>
            {/* <Grid
                container
                justify="center"
                spacing={2}
            >
                {dance?.scores_judges.map((judge, index) => (
                    <Grid key={index} item>
                        <Typography variant='h6'>
                            {judge.substring(0, judge.lastIndexOf(' '))}
                        </Typography>
                        <Typography variant='h6'>{dance.scores_values[index]}</Typography>
                    </Grid>
                ))}
            </Grid> */}

            {dance?.link && <Typography variant="h6">{dance?.link}</Typography>}
            {dance?.theme && dance.theme !== 'No theme' && (
                <Typography variant="h6">{dance.theme} Week</Typography>
            )}

            {dance?.extra && (
                <Typography variant="h6">Notes - {dance.extra}</Typography>
            )}

            {/* turn into shared picture grid component */}
            <Typography variant="h5" mb={2}>
                PICTURES
            </Typography>

            <Grid container justifyContent="center" spacing={2} mb={2}>
                {dance.pictures?.map((picture, index) => (
                    <Grid key={index} item>
                        <Paper elevation={0}>
                            <Picture src={picture} />
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <ExtraPicUpload id={dance.id} type={tableType.DANCE} />
        </CardContainer>
    );
}

export default DanceCard;
