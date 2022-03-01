import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Avatar, Button, Grid } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { findTeamById } from '../../actions/teams';
import { useParams, useNavigate } from 'react-router-dom';

import AvatarEditor from 'react-avatar-editor';
import { Slider } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { addTeamPic, likeTeam } from '../../actions/teams';

import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import {
    Container,
    TeamName,
    CardContainer,
    CardAvatar,
    Header,
    LikesContainer,
} from '../shared/shared.js';
import { makeStyles } from '@mui/styles';
import ExtraPicUpload from '../shared/ExtraPicUpload';
import * as tableType from '../../constants/tableTypes';
import { convertPlacement } from '../shared/functions';

const useStyles = makeStyles({
    avi: {
        width: '100px',
        height: '100px',
        margin: 'auto',
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

    useEffect(() => {
        dispatch(findTeamById(id));
        //const input = { search: id };
        //dispatch(searchDances(input));
        //dispatch(fetchPros());
    }, [dispatch]);

    const pro = pros.find((pro) => pro.id === team.pro_id);
    const celeb = celebs.find((celeb) => celeb.id === team.celeb_id);
    const placement = convertPlacement(team.placement);

    // move to shared exports?
    const Likes = () => {
        if (team.likes?.length > 0) {
            return team.likes.find((like) => like === user?.result?._id) ? (
                <>
                    <FavoriteIcon className={classes.icons} />
                </>
            ) : (
                <>
                    <FavoriteBorderIcon className={classes.icons} />
                </>
            );
        }

        return (
            <>
                <FavoriteBorderIcon className={classes.icons} />
            </>
        );
    };

    return loading ? (
        <CircularProgress className={classes.progress} />
    ) : (
        <CardContainer>
            <Header>
                <Button className={classes.back} onClick={() => navigate(-1)}>
                    <ArrowBackIosIcon className={classes.icons} />
                </Button>
                <CardAvatar src={team.cover_pic} />
                <LikesContainer>
                    <Button
                        disableRipple
                        onClick={() => dispatch(likeTeam(id))}
                    >
                        <Likes />
                    </Button>
                    {team?.likes?.length > 0 && (
                        <LikeText>{team.likes.length}</LikeText>
                    )}
                </LikesContainer>
            </Header>

            <TeamName>
                {celeb?.first_name} {celeb?.last_name} & {pro?.first_name}{' '}
                {pro?.last_name}
            </TeamName>
            {team.team_name && <TeamName>#team{team.team_name}</TeamName>}
            <Season>Season {team.season_id}</Season>
            {team.placement && <Placement>{placement} Place</Placement>}
            <Grid
                container
                justifyContent="center"
                className={classes.root}
                spacing={2}
            >
                <Grid item>
                    <BasicText>DANCES</BasicText>
                    {/* <GridText>{dances?.length}</GridText> */}
                </Grid>
                <Grid item>
                    <BasicText>TENS</BasicText>
                    {/* <GridText>{dances?.filter(dance => dance.scores.some(score => score.score === 10)).length}</GridText> */}
                </Grid>
                <Grid item>
                    <BasicText>PERFECTS</BasicText>
                    {/* <GridText>{dances?.filter(dance => dance.isPerfect === true).length}</GridText> */}
                </Grid>
            </Grid>

            {/* {dances && <BasicText>DANCES (IN ORDER)</BasicText>}
                {dances?.map(dance => 
                    <DanceText>{dance.style} - {dance?.scores.reduce(((a, b) => a + b["score"]), 0)}</DanceText>)
                } */}
            <BasicText>SOCIALS</BasicText>
            <Grid
                container
                justifyContent="center"
                className={classes.root}
                spacing={2}
            >
                <Grid item>
                    <InstagramIcon className={classes.icons} />
                    <SocialsRow>
                        {celeb?.instagram && (
                            <SocialsText
                                href={
                                    'https://www.instagram.com/' +
                                    celeb.instagram
                                }
                            >
                                @{celeb.instagram}
                            </SocialsText>
                        )}
                        {pro?.instagram && (
                            <SocialsText
                                href={
                                    'https://www.instagram.com/' + pro.instagram
                                }
                            >
                                @{pro.instagram}
                            </SocialsText>
                        )}
                    </SocialsRow>
                </Grid>
                <Grid item>
                    <TwitterIcon className={classes.icons} />
                    <SocialsRow>
                        {celeb?.twitter && (
                            <SocialsText
                                href={
                                    'https://www.twitter.com/' + celeb.twitter
                                }
                            >
                                @{celeb.twitter}
                            </SocialsText>
                        )}
                        {pro?.twitter && (
                            <SocialsText
                                href={'https://www.twitter.com/' + pro.twitter}
                            >
                                @{pro.twitter}
                            </SocialsText>
                        )}
                    </SocialsRow>
                </Grid>
                <Grid item>
                    <FacebookIcon className={classes.icons} />
                    <SocialsRow>
                        {celeb?.tiktok && (
                            <SocialsText
                                href={'https://www.tiktok.com/' + celeb.tiktok}
                            >
                                @{celeb.tiktok}
                            </SocialsText>
                        )}
                        {pro?.tiktok && (
                            <SocialsText
                                href={'https://www.tiktok.com/' + pro.tiktok}
                            >
                                @{pro.tiktok}
                            </SocialsText>
                        )}
                    </SocialsRow>
                </Grid>
            </Grid>

            <BasicText>PICTURES</BasicText>
            <ContentContainer>
                <Grid
                    container
                    justifyContent="center"
                    className={classes.root}
                    spacing={2}
                >
                    {team?.pictures?.map((picture, index) => (
                        <Grid key={index} item>
                            <InnerContainer>
                                <Picture src={picture} />
                            </InnerContainer>
                        </Grid>
                    ))}
                </Grid>
            </ContentContainer>

            <ExtraPicUpload id={team.id} type={tableType.TEAM} />
        </CardContainer>
    );
}

const GridText = styled.h6`
    font-size: 15px;
    font-weight: 500;
    margin: 2px auto 10px auto;
    //color: lightgrey;
`;

const Season = styled.h5`
    font-size: 20px;
    font-weight: 500;
    margin: 5px auto;
    //color: lightgrey;
`;

const Placement = styled.h6`
    font-size: 15px;
    font-weight: 500;
    margin: 2px auto 10px auto;
    //color: grey;
`;

const LikeText = styled.h6`
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    color: white;
    margin: 10px 0;
`;

const BasicText = styled.h6`
    /* font-size: 12px;
    font-weight: 500;
    margin: 5px 0;
    //color: rgba(0, 0, 0, 0.6);
    text-align: center;
    padding: 5px 1px;
    color: white; */
`;

const DanceText = styled.h6`
    font-size: 12px;
    font-weight: 500;
    margin: 5px 0;
    //color: lightgrey;
`;

const SocialsText = styled.a`
    font-size: 12px;
    font-weight: 500;
    margin: 0 5px;
    //color: black;
    text-decoration: none;
    //color: white
`;

const HiddenInput = styled.input`
    opacity: 0;
    width: 0.1px;
    height: 0.1px;
    position: absolute;
`;

const ContentContainer = styled.div`
    width: 100%;
    margin: 10px auto;
`;

const InnerContainer = styled.div`
    width: 100%;
`;

const Picture = styled.img`
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    position: relative;
`;

const SocialsRow = styled.div`
    width: 100%;
`;

export default TeamCard;
