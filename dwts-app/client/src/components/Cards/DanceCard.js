import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Avatar, Button, Grid, Paper, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { findDanceById } from '../../actions/dances';
import { fetchTeams } from '../../actions/teams';
import { useParams, useNavigate, Link } from 'react-router-dom';

import AvatarEditor from 'react-avatar-editor';
import { Slider } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { addDancePic, likeDance } from '../../actions/dances';
import * as tableType from '../../constants/tableTypes';

import {
    Container,
    CardContainer,
    Picture,
    Header,
    LikesContainer,
    CardAvatar,
} from '../shared/shared.js';

import TeamsPreview from '../Previews/TeamsPreview';
import { makeStyles } from '@mui/styles';
import { convertPlacement, Likes } from '../shared/functions';
import ExtraPicUpload from '../shared/ExtraPicUpload';
import DataGetter from '../shared/DataGetter';

import { createLoadingSelector } from '../../api/selectors';

import * as actionType from '../../constants/actionTypes';
const useStyles = makeStyles({
    avi: {
        width: '100px',
        height: '100px',
        margin: 'auto',
    },
    statsGrid: {
        flexGrow: 1,
    },
    progress: {
        margin: 'auto',
    },
    back: {
        float: 'left',
        margin: '0',
        position: 'relative',
    },
    slider: {
        width: '20ch',
        position: 'relative',
    },
    editor: {
        width: '100%',
        margin: '10px auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    root: {
        flexGrow: 1,
    },
    icons: {
        color: 'lightgrey',
    },
    button: {
        margin: '0',
        padding: '0',
        maxWidth: '20px',
    },
});

function DanceCard() {
    const classes = useStyles();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const dance = useSelector((state) => state.data.dance);
    const loading2 = useSelector((state) => state.loading.DANCEFIND);
    const teams = useSelector((state) => state.data.teams);
    const pros = useSelector((state) => state.data.pros);
    const { id } = useParams();
    const likes = useSelector((state) => state.likes.dances);

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
        <CircularProgress className={classes.progress} />
    ) : (
        <CardContainer elevation={0}>
            <Header>
                <Button onClick={() => navigate(-1)}>
                    <ArrowBackIosIcon />
                </Button>
                <CardAvatar src={'/defaultPic.jpeg'} />
                <LikesContainer>
                    <Button onClick={() => dispatch(likeDance(id))}>
                        <Likes user={user} likes={likes} />
                    </Button>
                    <Typography variant="subtitle1">{likes.length}</Typography>
                </LikesContainer>
            </Header>

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
            <Grid
                container
                justify="center"
                className={classes.root}
                spacing={2}
            >
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
