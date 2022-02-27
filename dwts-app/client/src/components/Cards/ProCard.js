import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Avatar, Button, Link, Typography } from "@mui/material";
import CheckJWT from "../shared/logout";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { findProById, likePro } from "../../actions/pros";

import { Container, TeamName, CardContainer, CardAvatar, Header, LikesContainer, SocialsRow, Picture } from '../shared/shared.js'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { createLoadingSelector } from '../../api/selectors';

import * as actionType from '../../constants/actionTypes';
import { convertDate, getAge, Likes } from "../shared/functions";
import { Grid, Paper } from "@mui/material";

import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import ExtraPicUpload from '../shared/ExtraPicUpload';
import * as tableType from '../../constants/tableTypes';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
})

function ProCard() {
    CheckJWT();
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const pro = useSelector(state => state.data.pro);
    const { id } = useParams();
    //const loadingSelector = createLoadingSelector([actionType.PROSEARCH]);
    //const isFetching = useSelector((state) => loadingSelector(state));
    const loading = useSelector(state => state.loading.PROFIND);
    const likes = useSelector(state => state.likes.pros);

    const birthday = convertDate(pro.birthday);
    const age = getAge(pro.birthday);

    useEffect(() => {
        dispatch(findProById(id));
    }, [dispatch, id])

    return (
        loading ? <div>insert loading bar</div> :

            <CardContainer>
                <Header>
                    <Button onClick={() => navigate(-1)}>
                        <ArrowBackIosIcon />
                    </Button>
                    <CardAvatar src={pro.cover_pic ? pro.cover_pic : "/defaultPic.jpeg"} />
                    <LikesContainer>
                        <Button disableRipple onClick={() => dispatch(likePro(id))}>
                            <Likes user={user} likes={likes} />
                        </Button>
                        <Typography variant="subtitle1">{likes.length}</Typography>
                    </LikesContainer>
                </Header>


                <Typography variant="h4" gutterBottom>{pro.first_name} {pro?.last_name}</Typography>
                {pro?.birthday && <Typography variant="h5">Age - {age} ({birthday})</Typography>}
                {pro?.height && <Typography variant="h5">Height - {pro.height}</Typography>}
                {/* is junior? */}

                <Typography variant="h6" my={2}>SOCIALS</Typography>
                <Grid container justifyContent="center" className={classes.root} spacing={2}>
                    {pro?.instagram && <Grid item>
                        <InstagramIcon />
                        <SocialsRow>
                            <Link href={'https://www.instagram.com/' + pro.instagram} target="_blank" rel="noopener" underline="none">@{pro.instagram}</Link>
                        </SocialsRow>
                    </Grid>}
                    {pro?.twitter && <Grid item>
                        <TwitterIcon />
                        <SocialsRow>
                            <Link href={'https://www.twitter.com/' + pro.twitter} target="_blank" rel="noopener" underline="none">@{pro.twitter}</Link>
                        </SocialsRow>
                    </Grid>}
                    {pro?.tiktok && <Grid item>
                        <FacebookIcon />
                        <SocialsRow>
                            <Link href={'https://www.tiktok.com/' + pro.tiktok} target="_blank" rel="noopener" underline="none">@{pro.tiktok}</Link>
                        </SocialsRow>
                    </Grid>}
                </Grid>

                <Typography variant="h6" my={2}>PICTURES</Typography>

                <Grid container justifyContent="center" className={classes.root} spacing={2} mb={2}>
                    {pro?.pictures?.map((picture, index) => (
                        <Grid key={index} item>
                            <Paper elevation={0}>
                                <Picture src={picture} />
                            </Paper>
                        </Grid>
                    ))}
                </Grid>


                <ExtraPicUpload
                    id={pro.id}
                    type={tableType.PRO}
                />
            </CardContainer>
    )
}

export default ProCard;