import React, { useEffect } from 'react';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { findUserById } from '../../actions/fans';

import { CardAvatar, LikesContainer, SocialsRow } from '../shared/regStyles.js';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import * as actionType from '../../constants/actionTypes';
import { createLoadingSelector } from '../../api/selectors';
import SocialsLink from '../shared/SocialsLink';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import { CardContainer } from '../shared/muiStyles';
import Progress from '../shared/Progress';

function FanCard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fan = useSelector((state) => state.users.user);
    const { id } = useParams();
    const loadingSelector = createLoadingSelector([actionType.USERFIND]);
    const loading = useSelector((state) => loadingSelector(state));

    useEffect(() => {
        dispatch(findUserById(id));
    }, [dispatch, id]);

    return loading ? (
        <Progress />
    ) : (
        <CardContainer>
            <Stack direction="row">
                <Button onClick={() => navigate(-1)}>
                    <ArrowBackIosIcon />
                </Button>
                <CardAvatar
                    src={fan.cover_pic ? fan.cover_pic : '/defaultPic.jpeg'}
                />
                <LikesContainer>
                    <Button>test</Button>
                    <Typography variant="subtitle1">2</Typography>
                </LikesContainer>
            </Stack>

            <Typography variant="h4" gutterBottom>
                {fan.username}
            </Typography>

            <Typography variant="h6" my={2}>
                SOCIALS
            </Typography>
            <Grid container justifyContent="center" spacing={2}>
                {fan?.instagram && (
                    <Grid item>
                        <InstagramIcon />
                        <SocialsRow>
                            <SocialsLink
                                platform={'instagram'}
                                username={fan.instagram}
                            />
                        </SocialsRow>
                    </Grid>
                )}
                {fan?.twitter && (
                    <Grid item>
                        <TwitterIcon />
                        <SocialsRow>
                            <SocialsLink
                                platform={'twitter'}
                                username={fan.twitter}
                            />
                        </SocialsRow>
                    </Grid>
                )}
                {fan?.tiktok && (
                    <Grid item>
                        <FacebookIcon />
                        <SocialsRow>
                            <SocialsLink
                                platform={'tiktok'}
                                username={fan.tiktok}
                            />
                        </SocialsRow>
                    </Grid>
                )}
            </Grid>
        </CardContainer>
    );
}

export default FanCard;
