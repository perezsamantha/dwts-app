import React, { useEffect } from 'react';
import {
    Avatar,
    Box,
    Button,
    Divider,
    Grid,
    Stack,
    Typography,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useDispatch, useSelector } from 'react-redux';
import { findTeamById } from '../../actions/teams';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { likeTeam } from '../../actions/teams';
import ExtraPicUpload from '../shared/ExtraPicUpload';
import * as tableType from '../../constants/tableTypes';
import {
    convertPlacement,
    getNumberOfTens,
    getNumberOfPerfects,
    getFullTeamName,
    getAverageScore,
    convertHeight,
    getAge,
    getTotalScore,
} from '../shared/functions';
import SocialsLink from '../shared/SocialsLink';
import { createLoadingSelector } from '../../api/selectors';
import * as actionType from '../../constants/actionTypes';
import {
    BackButton,
    CoverPicture,
    IndividualsContainer,
} from '../shared/muiStyles';
import Progress from '../shared/Progress';
import Likes from '../shared/Likes';
import PicturesGrid from './Supporting/PicturesGrid';
import { motion } from 'framer-motion';

function Team() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.authData);
    const team = useSelector((state) => state.teams.team);

    const loadingSelector = createLoadingSelector([actionType.TEAMFIND]);
    const loading = useSelector((state) => loadingSelector(state));

    const { id } = useParams();

    useEffect(() => {
        dispatch(findTeamById(id));
    }, [dispatch, id]);

    const { celeb, pro, dances, likes, pictures } = team;

    return loading || Number(team?.id) !== Number(id) ? (
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
                <CoverPicture
                    component="img"
                    src={team.cover_pic ? team.cover_pic : '/defaultPic.jpeg'}
                />
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
                        onClick={() => dispatch(likeTeam(id))}
                    >
                        <Likes user={user} likes={likes} />
                    </Button>
                    <Typography variant="subtitle1">{likes?.length}</Typography>
                </Box>
            </Stack>

            <Stack my={1}>
                <Typography variant="h4">
                    {getFullTeamName(celeb, pro)}
                </Typography>

                {team.team_name && (
                    <Typography variant="subtitle1">
                        #team{team.team_name}
                    </Typography>
                )}
            </Stack>

            <Stack my={1}>
                <Typography variant="h5">Season {team.season_id}</Typography>

                {team.placement && (
                    <Typography variant="h6">
                        {convertPlacement(team.placement)} Place
                    </Typography>
                )}

                <Typography variant="h6">
                    Average Score - {getAverageScore(dances)}
                </Typography>
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
                        <Typography>Dances</Typography>
                        <Typography>{dances.length}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>Tens</Typography>
                        <Typography>{getNumberOfTens(dances)}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>Perfects</Typography>
                        <Typography>{getNumberOfPerfects(dances)}</Typography>
                    </Grid>
                </Grid>
            </Stack>

            <Stack sx={{ display: 'flex', flexDirection: 'column' }} my={1}>
                <Typography variant="h5">
                    Dances (In Order)
                    <Divider />
                </Typography>
                {dances.map((dance, index) => (
                    <Link
                        key={index}
                        to={{ pathname: `/dances/${dance.id}` }}
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
                        >
                            {dance.style} - {getTotalScore(dance.scores)}
                        </Box>
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

                <PicturesGrid pictures={pictures} />

                {user?.role === 'admin' && (
                    <ExtraPicUpload id={team.id} type={tableType.TEAM} />
                )}
            </Stack>
        </IndividualsContainer>
    );
}

export default Team;
