import React, { useEffect } from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { findTeamById } from '../../actions/teams';
import { useParams, useNavigate, Link } from 'react-router-dom';

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
import {
    convertPlacement,
    getDancesByTeam,
    getFullTeamName,
    getNumberOfTens,
    Likes,
} from '../shared/functions';
import DataGetter from '../shared/DataGetter';
import SocialsLink from '../shared/SocialsLink';

import { createLoadingSelector } from '../../api/selectors';

import * as actionType from '../../constants/actionTypes';

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

    const team = useSelector((state) => state.teams.team);

    // issue where on refresh because there's no loading state, data undefined
    // temp solution by adding 'team !== null'
    const loadingSelector = createLoadingSelector([
        actionType.TEAMFIND,
        actionType.PROSEARCH,
        actionType.CELEBSEARCH,
        actionType.SEASONSEARCH,
        actionType.DANCESEARCH,
        actionType.DANCERSEARCH,
        actionType.SCORESEARCH,
    ]);
    const loading = useSelector((state) => loadingSelector(state));

    const pros = useSelector((state) => state.pros.pros);
    const celebs = useSelector((state) => state.celebs.celebs);
    const { id } = useParams();
    const dances = useSelector((state) => state.dances.dances);
    const dancers = useSelector((state) => state.dancers.dancers);
    const scores = useSelector((state) => state.scores.scores);

    useEffect(() => {
        dispatch(findTeamById(id));
    }, [dispatch, id]);

    // const pro = pros.find((pro) => pro.id === team.pro_id);
    // const celeb = celebs.find((celeb) => celeb.id === team.celeb_id);
    const placement = convertPlacement(team.placement);
    //const fullTeamName = getFullTeamName({ celeb: celeb, pro: pro });

    let dancesByTeam = [];
    let celeb,
        pro,
        fullTeamName = '';
    let numTens = 0;
    if (!loading) {
        pro = pros.find((pro) => pro.id === team.pro_id);
        celeb = celebs.find((celeb) => celeb.id === team.celeb_id);

        // fullTeamName = getFullTeamName(celeb, pro);
        dancesByTeam = getDancesByTeam(team, dances, dancers);
        numTens = getNumberOfTens(dancesByTeam, scores);
    }
    return loading || Object.keys(team).length === 0 ? (
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
                        <Likes user={user} likes={team.likes} />
                    </Button>
                    <Typography variant="subtitle1">
                        {team.likes?.length}
                    </Typography>
                </LikesContainer>
            </Header>

            <Typography variant="h4" gutterBottom>
                <DataGetter id={team.id} type={tableType.TEAM} />
                {/* {fullTeamName} */}
            </Typography>
            <Typography variant="h5" mb={1}>
                Season {team.season_id}
            </Typography>
            {team.placement && (
                <Typography variant="h5">{placement} Place</Typography>
            )}
            {team.team_name && (
                <Typography variant="h6">#team{team.team_name}</Typography>
            )}

            <Grid
                container
                justifyContent="center"
                className={classes.root}
                spacing={2}
                my={1}
            >
                <Grid item>
                    <Typography variant="subtitle1">DANCES</Typography>
                    <Typography variant="subtitle1">
                        {dancesByTeam.length}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1">TENS</Typography>
                    <Typography variant="subtitle1">{numTens}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1">PERFECTS</Typography>
                    {/* <Typography variant="subtitle1">{dances?.filter(dance => dance.isPerfect === true).length}</Typography> */}
                </Grid>
            </Grid>

            {dancesByTeam && (
                <Typography variant="subtitle1">DANCES (IN ORDER)</Typography>
            )}
            {dancesByTeam.map((dance, index) => (
                // <Typography variant="subtitle1">
                <Link
                    key={index}
                    to={{ pathname: `/dances/${dance.id}` }}
                    style={{
                        textDecoration: 'inherit',
                        color: 'inherit',
                    }}
                >
                    {dance.style} - 30
                    {/* {dance?.scores.reduce((a, b) => a + b['score'], 0)} */}
                </Link>
                // </Typography>
            ))}
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
                            <SocialsLink
                                platform={'instagram'}
                                username={celeb.instagram}
                            />
                        )}
                        {pro?.instagram && (
                            <SocialsLink
                                platform={'instagram'}
                                username={pro.instagram}
                            />
                        )}
                    </SocialsRow>
                </Grid>
                <Grid item>
                    <TwitterIcon className={classes.icons} />
                    <SocialsRow>
                        {celeb?.twitter && (
                            <SocialsLink
                                platform={'twitter'}
                                username={celeb.twitter}
                            />
                        )}
                        {pro?.twitter && (
                            <SocialsLink
                                platform={'twitter'}
                                username={pro.twitter}
                            />
                        )}
                    </SocialsRow>
                </Grid>
                <Grid item>
                    <FacebookIcon className={classes.icons} />
                    <SocialsRow>
                        {celeb?.tiktok && (
                            <SocialsLink
                                platform={'tiktok'}
                                username={celeb.tiktok}
                            />
                        )}
                        {pro?.tiktok && (
                            <SocialsLink
                                platform={'tiktok'}
                                username={pro.tiktok}
                            />
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
