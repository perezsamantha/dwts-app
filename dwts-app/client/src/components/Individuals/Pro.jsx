import React, { useEffect } from 'react';
import { Button, Divider, Grid, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { findProById, likePro } from '../../actions/pros';

import { CardAvatar, LikesContainer } from '../shared/regStyles.js';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { createLoadingSelector } from '../../api/selectors';

import * as actionType from '../../constants/actionTypes';
import {
    convertHeight,
    getAge,
    getFullCelebName,
    getMonthDayAndYear,
    getTeamsByPro,
} from '../shared/functions';

import ExtraPicUpload from '../shared/ExtraPicUpload';
import * as tableType from '../../constants/tableTypes';
import SocialsLink from '../shared/SocialsLink';
import { IndividualsContainer } from '../shared/muiStyles';
import Progress from '../shared/Progress';
import Likes from '../shared/Likes';
import PicturesGrid from './Supporting/PicturesGrid';
import { Link } from 'react-router-dom';
import { FaBirthdayCake } from 'react-icons/fa';

function Pro() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const pro = useSelector((state) => state.pros.pro);
    const celebs = useSelector((state) => state.celebs.celebs);
    const teams = useSelector((state) => state.teams.teams);
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

    let teamsByPro = [];

    if (!loading) {
        teamsByPro = getTeamsByPro(pro, teams);
    }

    return loading || Number(pro?.id) !== Number(id) ? (
        <Progress />
    ) : (
        <IndividualsContainer>
            <Stack direction="row">
                <Button onClick={() => navigate(-1)}>
                    <ArrowBackIosIcon />
                </Button>
                <CardAvatar
                    src={pro.cover_pic ? pro.cover_pic : '/defaultPic.jpeg'}
                />
                <LikesContainer>
                    <Button disableRipple onClick={() => dispatch(likePro(id))}>
                        <Likes user={user} likes={pro.likes} />
                    </Button>
                    <Typography variant="subtitle1">
                        {pro.likes?.length}
                    </Typography>
                </LikesContainer>
            </Stack>

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
                            <FaBirthdayCake />
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
                        <Typography variant="subtitle1">10</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">
                            Avg Placement
                        </Typography>
                        <Typography variant="subtitle1">10</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">Dances</Typography>
                        <Typography variant="subtitle1">10</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">Perfects</Typography>
                        <Typography variant="subtitle1">10</Typography>
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
                    <Typography>Pro has no linked socials 💔</Typography>
                )}
            </Stack>

            {teamsByPro.length !== 0 && (
                <Stack my={1}>
                    <Typography variant="h5">
                        Teams (In Order)
                        <Divider />
                    </Typography>
                    {teamsByPro.map((team, index) => (
                        <Link
                            key={index}
                            to={{ pathname: `/teams/${team.id}` }}
                            style={{
                                textDecoration: 'inherit',
                                color: 'inherit',
                            }}
                        >
                            Season {team.season_id} w/{' '}
                            {getFullCelebName(team.celeb_id, celebs)}
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
                    <Typography mb={1}>
                        No pictures yet for this pro 💔
                    </Typography>
                )}

                <ExtraPicUpload id={pro.id} type={tableType.PRO} />
            </Stack>
        </IndividualsContainer>
    );
}

export default Pro;
