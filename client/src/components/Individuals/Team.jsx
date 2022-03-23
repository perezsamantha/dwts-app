import React, { useEffect } from 'react';
import {
    Avatar,
    Box,
    Button,
    Divider,
    Grid,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useDispatch, useSelector } from 'react-redux';
import { findTeamById } from '../../actions/teams';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { likeTeam } from '../../actions/teams';
import { CardAvatar, LikesContainer } from '../shared/regStyles.js';
import ExtraPicUpload from '../shared/ExtraPicUpload';
import * as tableType from '../../constants/tableTypes';
import {
    convertPlacement,
    getDancesByTeam,
    getNumberOfTens,
    getNumberOfPerfects,
    getScoreByDance,
    getFullTeamName,
    getAverageScore,
    sortTeamDancesByWeek,
    convertHeight,
    getAge,
} from '../shared/functions';
import SocialsLink from '../shared/SocialsLink';
import { createLoadingSelector } from '../../api/selectors';
import * as actionType from '../../constants/actionTypes';
import { IndividualsContainer } from '../shared/muiStyles';
import Progress from '../shared/Progress';
import Likes from '../shared/Likes';
import PicturesGrid from './Supporting/PicturesGrid';

function Team(props) {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.authData);

    const dispatch = useDispatch();

    const team = useSelector((state) => state.teams.team);

    // issue where on refresh because there's no loading state, data undefined
    // temp solution by adding 'team !== null'
    const loadingSelector = createLoadingSelector([
        actionType.TEAMFIND,
        actionType.FETCHALLDATA,
    ]);
    const loading = useSelector((state) => loadingSelector(state));

    const pros = useSelector((state) => state.pros.pros);
    const celebs = useSelector((state) => state.celebs.celebs);
    const { id } = useParams();
    const dances = useSelector((state) => state.dances.dances);
    const dancers = useSelector((state) => state.dancers.dancers);
    const scores = useSelector((state) => state.scores.scores);
    const episodes = useSelector((state) => state.episodes.episodes);

    useEffect(() => {
        dispatch(findTeamById(id));
    }, [dispatch, id]);

    const placement = convertPlacement(team.placement);

    let dancesByTeam,
        sortedDancesByWeek = [];
    let celeb,
        pro = {};
    let fullTeamName = '';
    let avgScore,
        numTens,
        numPerfects = 0;

    if (!loading) {
        pro = pros.find((pro) => pro.id === team.pro_id);
        celeb = celebs.find((celeb) => celeb.id === team.celeb_id);

        if (typeof pro !== 'undefined' && typeof celeb !== 'undefined') {
            fullTeamName = getFullTeamName(celeb, pro);
        }
        dancesByTeam = getDancesByTeam(team, dances, dancers);

        sortTeamDancesByWeek(dancesByTeam, episodes);
        //sortedDancesByWeek = sortTeamDancesByWeek(dancesByTeam, episodes);
        avgScore = getAverageScore(dancesByTeam, scores);
        numTens = getNumberOfTens(dancesByTeam, scores);
        numPerfects = getNumberOfPerfects(dancesByTeam, scores);
    }

    return loading || Number(team?.id) !== Number(id) ? (
        <Progress />
    ) : (
        <IndividualsContainer>
            <Stack direction="row">
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
            </Stack>

            <Stack my={1}>
                <Typography variant="h4">{fullTeamName}</Typography>

                {team.team_name && (
                    <Typography variant="subtitle1">
                        #team{team.team_name}
                    </Typography>
                )}
            </Stack>

            <Stack my={1}>
                <Typography variant="h5">Season {team.season_id}</Typography>

                {team.placement && (
                    <Typography variant="h6">{placement} Place</Typography>
                )}

                <Typography variant="h6">Average Score - {avgScore}</Typography>
            </Stack>

            <Stack my={1}>
                <Typography variant="h5" my={1}>
                    Overview
                    <Divider />
                </Typography>
                <Stack spacing={2} my={1}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Box>
                            <Avatar src={celeb?.cover_pic} />
                        </Box>
                        <Box>
                            <Stack direction="row" spacing={2}>
                                <Typography>
                                    {convertHeight(celeb?.height)}
                                </Typography>
                                <Typography>
                                    {getAge(celeb?.birthday)} Years Old
                                </Typography>
                            </Stack>
                        </Box>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Box>
                            <Avatar src={pro?.cover_pic} />
                        </Box>
                        <Box>
                            <Stack direction="row" spacing={2}>
                                <Typography>
                                    {convertHeight(pro?.height)}
                                </Typography>
                                <Typography>
                                    {getAge(pro?.birthday)} Years Old
                                </Typography>
                            </Stack>
                        </Box>
                    </Stack>
                </Stack>
            </Stack>

            <Stack my={1}>
                <Typography variant="h5">
                    Stats
                    <Divider />
                </Typography>
                <Grid container justifyContent="center" spacing={2} mb={1}>
                    <Grid item>
                        <Typography variant="subtitle1">Dances</Typography>
                        <Typography variant="subtitle1">
                            {dancesByTeam.length}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">Tens</Typography>
                        <Typography variant="subtitle1">{numTens}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">Perfects</Typography>
                        <Typography variant="subtitle1">
                            {numPerfects}
                        </Typography>
                    </Grid>
                </Grid>
            </Stack>

            <Stack sx={{ display: 'flex', flexDirection: 'column' }} my={1}>
                <Typography variant="h5">
                    Dances (In Order)
                    <Divider />
                </Typography>
                {dancesByTeam.map((dance, index) => (
                    <Link
                        key={index}
                        to={{ pathname: `/dances/${dance.id}` }}
                        style={{
                            textDecoration: 'inherit',
                            color: 'inherit',
                        }}
                    >
                        {dance.style} - {getScoreByDance(dance, scores)}
                    </Link>
                ))}
            </Stack>

            <Stack my={1}>
                <Typography variant="h5" my={1}>
                    Socials
                    <Divider />
                </Typography>
                <Stack spacing={2} my={1}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Box>
                            <Avatar src={celeb?.cover_pic} />
                        </Box>
                        <Box>
                            <Stack direction="row" spacing={2}>
                                <SocialsLink
                                    platform={'instagram'}
                                    username={celeb?.instagram}
                                />
                                <SocialsLink
                                    platform={'twitter'}
                                    username={celeb?.twitter}
                                />
                                <SocialsLink
                                    platform={'tiktok'}
                                    username={celeb?.tiktok}
                                />
                            </Stack>
                        </Box>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Box>
                            <Avatar src={pro?.cover_pic} />
                        </Box>
                        <Box>
                            <Stack direction="row" spacing={2}>
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
                        </Box>
                    </Stack>
                </Stack>
            </Stack>

            <Stack my={1}>
                <Typography variant="h5">
                    Pictures
                    <Divider />
                </Typography>

                <PicturesGrid pictures={team?.pictures} />

                <ExtraPicUpload id={team.id} type={tableType.TEAM} />
            </Stack>
        </IndividualsContainer>
    );
}

export default Team;
