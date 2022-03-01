import React, { useEffect } from 'react';
import { Button, Grid, Link, Paper, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { findTeamById } from '../../actions/teams';
import { useParams, useNavigate } from 'react-router-dom';

import { addTeamPic, likeTeam } from '../../actions/teams';

import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

import {
    CardContainer,
    CardAvatar,
    Header,
    LikesContainer,
    Picture,
    SocialsRow,
} from '../shared/shared.js';
import { makeStyles } from '@mui/styles';
import ExtraPicUpload from '../shared/ExtraPicUpload';
import * as tableType from '../../constants/tableTypes';
import { convertPlacement, Likes } from '../shared/functions';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

function TeamCard(props) {
    //CheckJWT();
    const classes = useStyles();
    const navigate = useNavigate();

    //const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    //const [team, setTeam] = useState(null);
    const user = JSON.parse(localStorage.getItem('profile'));

    const dispatch = useDispatch();
    //const history = useHistory();

    const team = useSelector((state) => state.data.team);
    // separate loadings?
    const loading = useSelector(
        (state) => state.loading.TEAMFIND || state.loading.TEAMUPDATE
    );
    const dances = useSelector((state) => state.data.dances);
    const pros = useSelector((state) => state.data.pros);
    const celebs = useSelector((state) => state.data.celebs);
    const { id } = useParams();
    const likes = useSelector((state) => state.likes.teams);

    useEffect(() => {
        dispatch(findTeamById(id));
        //const input = { search: id };
        //dispatch(searchDances(input));
        //dispatch(fetchPros());
    }, [dispatch, id]);

    const pro = pros.find((pro) => pro.id === team.pro_id);
    const celeb = celebs.find((celeb) => celeb.id === team.celeb_id);
    const placement = convertPlacement(team.placement);

    return loading ? (
        <CircularProgress className={classes.progress} />
    ) : (
        <CardContainer elevation={0}>
            <Header>
                <Button onClick={() => navigate(-1)}>
                    <ArrowBackIosIcon />
                </Button>
                <CardAvatar
                    src={team.cover_pic ? team.cover_pic : '/defaultPic.jpeg'}
                />
                <LikesContainer>
                    <Button
                        disableRipple
                        onClick={() => dispatch(likeTeam(id))}
                    >
                        <Likes user={user} likes={likes} />
                    </Button>
                    <Typography variant="subtitle1">{likes.length}</Typography>
                </LikesContainer>
            </Header>

            <Typography variant="h4" gutterBottom>
                {celeb?.first_name} {celeb?.last_name} & {pro?.first_name}{' '}
                {pro?.last_name}
            </Typography>
            {team.team_name && (
                <Typography variant="h5">#team{team.team_name}</Typography>
            )}
            <Typography variant="h5" mb={1}>
                Season {team.season_id}
            </Typography>
            {team.placement && (
                <Typography variant="h5">{placement} Place</Typography>
            )}
            <Grid
                container
                justifyContent="center"
                className={classes.root}
                spacing={2}
                mb={2}
            >
                <Grid item>
                    <Typography variant="subtitle1">DANCES</Typography>
                    {/* <Typography variant="subtitle1">{dances?.length}</Typography> */}
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1">TENS</Typography>
                    {/* <Typography variant="subtitle1">{dances?.filter(dance => dance.scores.some(score => score.score === 10)).length}</Typography> */}
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1">PERFECTS</Typography>
                    {/* <Typography variant="subtitle1">{dances?.filter(dance => dance.isPerfect === true).length}</Typography> */}
                </Grid>
            </Grid>

            {/* {dances && <Typography variant="subtitle1">DANCES (IN ORDER)</Typography>}
                {dances?.map(dance => 
                    <Typography variant="subtitle1">{dance.style} - {dance?.scores.reduce(((a, b) => a + b["score"]), 0)}</Typography>)
                } */}
            <Typography variant="h5" mb={2}>
                SOCIALS
            </Typography>
            <Grid
                container
                justifyContent="center"
                className={classes.root}
                spacing={2}
                mb={2}
            >
                <Grid item>
                    <InstagramIcon className={classes.icons} />
                    <SocialsRow>
                        {celeb?.instagram && (
                            <Link
                                href={
                                    'https://www.instagram.com/' +
                                    celeb.instagram
                                }
                                target="_blank"
                                rel="noopener"
                                underline="none"
                            >
                                @{celeb.instagram}
                            </Link>
                        )}
                        {pro?.instagram && (
                            <Link
                                href={
                                    'https://www.instagram.com/' + pro.instagram
                                }
                                target="_blank"
                                rel="noopener"
                                underline="none"
                            >
                                @{pro.instagram}
                            </Link>
                        )}
                    </SocialsRow>
                </Grid>
                <Grid item>
                    <TwitterIcon className={classes.icons} />
                    <SocialsRow>
                        {celeb?.twitter && (
                            <Link
                                href={
                                    'https://www.twitter.com/' + celeb.twitter
                                }
                                target="_blank"
                                rel="noopener"
                                underline="none"
                            >
                                @{celeb.twitter}
                            </Link>
                        )}
                        {pro?.twitter && (
                            <Link
                                href={'https://www.twitter.com/' + pro.twitter}
                                target="_blank"
                                rel="noopener"
                                underline="none"
                            >
                                @{pro.twitter}
                            </Link>
                        )}
                    </SocialsRow>
                </Grid>
                <Grid item>
                    <FacebookIcon className={classes.icons} />
                    <SocialsRow>
                        {celeb?.tiktok && (
                            <Link
                                href={'https://www.tiktok.com/' + celeb.tiktok}
                                target="_blank"
                                rel="noopener"
                                underline="none"
                            >
                                @{celeb.tiktok}
                            </Link>
                        )}
                        {pro?.tiktok && (
                            <Link
                                href={'https://www.tiktok.com/' + pro.tiktok}
                                target="_blank"
                                rel="noopener"
                                underline="none"
                            >
                                @{pro.tiktok}
                            </Link>
                        )}
                    </SocialsRow>
                </Grid>
            </Grid>

            <Typography variant="h5" mb={2}>
                PICTURES
            </Typography>

            <Grid
                container
                justifyContent="center"
                className={classes.root}
                spacing={2}
                mb={2}
            >
                {team?.pictures?.map((picture, index) => (
                    <Grid key={index} item>
                        <Paper elevation={0}>
                            <Picture src={picture} />
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <ExtraPicUpload id={team.id} type={tableType.TEAM} />
        </CardContainer>
    );
}

export default TeamCard;
