import React, { useEffect } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { findProById, likePro } from '../../actions/pros';

import {
    CardAvatar,
    LikesContainer,
    SocialsRow,
    Picture,
} from '../shared/regStyles.js';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { createLoadingSelector } from '../../api/selectors';

import * as actionType from '../../constants/actionTypes';
import { convertDate, convertHeight, getAge } from '../shared/functions';
import { Grid, Paper } from '@mui/material';

import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import ExtraPicUpload from '../shared/ExtraPicUpload';
import * as tableType from '../../constants/tableTypes';
import SocialsLink from '../shared/SocialsLink';
import { IndividualsContainer } from '../shared/muiStyles';
import Progress from '../shared/Progress';
import Likes from '../shared/Likes';

function Pro() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const pro = useSelector((state) => state.pros.pro);
    const { id } = useParams();

    const loadingSelector = createLoadingSelector([actionType.PROFIND]);
    const loading = useSelector((state) => loadingSelector(state));

    const birthday = convertDate(pro.birthday);
    const age = getAge(pro.birthday);

    useEffect(() => {
        dispatch(findProById(id));
    }, [dispatch, id]);

    return loading ? (
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

            <Typography variant="h4" gutterBottom>
                {pro.first_name} {pro?.last_name}
            </Typography>
            {pro?.birthday && (
                <Typography variant="h5">
                    Age - {age} ({birthday})
                </Typography>
            )}
            {pro?.height && (
                <Typography variant="h5">
                    Height - {convertHeight(pro.height)}
                </Typography>
            )}
            {/* is junior? */}

            <Typography variant="h6" my={2}>
                SOCIALS
            </Typography>
            <Grid container justifyContent="center" spacing={2}>
                {pro?.instagram && (
                    <Grid item>
                        <InstagramIcon />
                        <SocialsRow>
                            <SocialsLink
                                platform={'instagram'}
                                username={pro.instagram}
                            />
                        </SocialsRow>
                    </Grid>
                )}
                {pro?.twitter && (
                    <Grid item>
                        <TwitterIcon />
                        <SocialsRow>
                            <SocialsLink
                                platform={'twitter'}
                                username={pro.twitter}
                            />
                        </SocialsRow>
                    </Grid>
                )}
                {pro?.tiktok && (
                    <Grid item>
                        <FacebookIcon />
                        <SocialsRow>
                            <SocialsLink
                                platform={'tiktok'}
                                username={pro.tiktok}
                            />
                        </SocialsRow>
                    </Grid>
                )}
            </Grid>

            <Typography variant="h6" my={2}>
                PICTURES
            </Typography>

            <Grid container justifyContent="center" spacing={2} mb={2}>
                {pro?.pictures?.map((picture, index) => (
                    <Grid key={index} item>
                        <Paper elevation={0}>
                            <Picture src={picture} />
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <ExtraPicUpload id={pro.id} type={tableType.PRO} />
        </IndividualsContainer>
    );
}

export default Pro;
