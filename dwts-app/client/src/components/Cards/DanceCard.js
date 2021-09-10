import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Avatar, Button, Grid, makeStyles } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { findDanceById } from '../../actions/dances';
import { useParams, useNavigate } from 'react-router-dom';

import AvatarEditor from 'react-avatar-editor';
import { Slider } from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { addDancePic, likeDance } from '../../actions/dances';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { Container, danceName } from '../shared/shared.js'
import CheckJWT from '../shared/logout';

const useStyles = makeStyles({
    avi: {
        width: "100px",
        height: "100px",
        margin: "auto",
    },
    statsGrid: {
        flexGrow: 1,
    },
    progress: {
        margin: "auto",
    },
    back: {
        float: "left",
        margin: "0",
        position: "relative",
    },
    slider: {
        width: "20ch",
        position: "relative",
    },
    editor: {
        width: "100%",
        margin: "10px auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    root: {
        flexGrow: 1,
    },
    icons: {
        color: "lightgrey",
    },
    button: {
        margin: "0",
        padding: "0",
        maxWidth: "20px",
    },
})

function DanceCard() {
    CheckJWT();
    const classes = useStyles();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const dance = useSelector(state => state.dances.dances);
    const loading = useSelector(state => state.dances.loading);
    const { id } = useParams();

    const [picData, setPicData] = useState(null);
    const [scaleValue, setScaleValue] = useState(10);

    const handleFile = (e) => {
        setPicData(e.target.files[0]);
    }

    const handleScale = (e, newValue) => {
        e.preventDefault();
        setScaleValue(newValue);
    }

    const handlePicture = (e) => {
        e.preventDefault();

        if (editor != null) {
            const data = new FormData();

            const canvas = editor.getImageScaledToCanvas();

            canvas.toBlob(function (blob) {
                data.append("pictures", blob, `${Date.now()}-${picData.name}`);
                dispatch(addDancePic(id, data));
                dispatch(findDanceById(id));
                setPicData(null);
            })
        }
    }

    const [editor, setEditor] = useState(null);

    const setEditorRef = (editor) => {
        setEditor(editor);
    }

    useEffect(() => {
        dispatch(findDanceById(id));
        setScaleValue(1);
        setPicData(null);
    }, [dispatch, id])

    const Likes = () => {
        if (dance.likes?.length > 0) {
            return dance.likes.find((like) => like === user?.result?._id) ?
                (
                    <><FavoriteIcon className={classes.icons} /></>
                ) : (
                    <><FavoriteBorderIcon className={classes.icons} /></>
                )
        }

        return <><FavoriteBorderIcon className={classes.icons} /></>;
    }

    return (

        (loading || Array.isArray(dance)) ? <CircularProgress className={classes.progress} /> :
            <Container>
                <Header>
                    <Button className={classes.back} onClick={() => navigate(-1)}>
                        <ArrowBackIosIcon className={classes.icons} />
                    </Button>
                    <LikesContainer>
                        <Button className={classes.button} disableRipple onClick={() => dispatch(likeDance(id))}>
                            <Likes />
                        </Button>
                        {dance.likes?.length > 0 && <LikeText>{dance.likes.length}</LikeText>}
                    </LikesContainer>
                </Header>
                {/* <Avatar className={classes.avi} alt={dance.style} src={dance.pic} />

                    
                    
                <danceName>{dance.celeb} & {dance.pro}</danceName>
                {dance.danceName && <danceName>{dance.danceName}</danceName>}
                <Season>Season {dance.season}</Season>
                {dance.placement && <Placement>{dance.placement} Place</Placement>}
                {user.result.role === "admin" && <danceSettings id={dance._id} />}
                <Grid container justify="center" className={classes.statsGrid} spacing={2}>
                    <Grid item>
                        <BasicText>DANCES</BasicText>
                        <GridText>{dance.numDances}</GridText>
                    </Grid>
                    <Grid item>
                        <BasicText>TENS</BasicText>
                        <GridText>{dance.numTens}</GridText>
                    </Grid>
                    <Grid item>
                        <BasicText>PERFECTS</BasicText>
                        <GridText>{dance.numPerfects}</GridText>
                    </Grid>
                </Grid>

                <BasicText>DANCES (IN ORDER)</BasicText>
                <DanceText>CHA CHA - (30) </DanceText>
                <DanceText>SAMBA - (30) </DanceText>
                <DanceText>CHARLESTON - (30) </DanceText>
                <BasicText>SOCIALS</BasicText>
                <Grid container justify="center" className={classes.statsGrid} spacing={2}>
                    <Grid item>
                        <InstagramIcon className={classes.icons} />
                        <SocialsRow>
                            {dance.socials?.instagram?.celeb && <SocialsText href={'https://www.instagram.com/' + dance.socials?.instagram?.celeb}>@{dance.socials?.instagram?.celeb}</SocialsText>}
                            {dance.socials?.instagram?.pro && <SocialsText href={'https://www.instagram.com/' + dance.socials?.instagram?.pro}>@{dance.socials?.instagram?.pro}</SocialsText>}
                        </SocialsRow>
                    </Grid>
                    <Grid item>
                        <TwitterIcon className={classes.icons} />
                        <SocialsRow>
                            {dance.socials?.twitter?.celeb && <SocialsText href={'https://www.twitter.com/' + dance.socials.twitter.celeb}>@{dance.socials.twitter.celeb}</SocialsText>}
                            {dance.socials?.twitter?.pro && <SocialsText href={'https://www.twitter.com/' + dance.socials.twitter.pro}>@{dance.socials.twitter.pro}</SocialsText>}
                        </SocialsRow>
                    </Grid>
                    <Grid item>
                        <FacebookIcon className={classes.icons} />
                        <SocialsRow>
                            {dance.socials?.facebook?.celeb && <SocialsText href={'https://www.facebook.com/' + dance.socials.facebook.celeb}>@{dance.socials.facebook.celeb}</SocialsText>}
                            {dance.socials?.facebook?.pro && <SocialsText href={'https://www.facebook.com/' + dance.socials.facebook.pro}>@{dance.socials.facebook.pro}</SocialsText>}
                        </SocialsRow>
                    </Grid>
                </Grid>

                <BasicText>PICTURES</BasicText>
                <ContentContainer>
                    <Grid container justify="center" className={classes.root} spacing={2}>

                        {dance.pictures?.map((picture, index) => (
                            <Grid key={index} item>
                                <InnerContainer>
                                    <Picture src={picture} />
                                </InnerContainer>
                            </Grid>
                        ))}

                    </Grid>
                </ContentContainer>
                <FileInput>
                    <HiddenInput
                        type="file"
                        accept=".jpeg, .jpg, .png"
                        onChange={handleFile}
                        id="pic"
                    />
                    <Label htmlFor="pic">
                        <AddAPhotoIcon className={classes.icons} />
                    </Label>

                    {picData != null && <div>
                        <AvatarEditor
                            image={picData}
                            width={200}
                            height={200}
                            borderRadius={10}
                            border={0}
                            scale={scaleValue}
                            ref={setEditorRef}
                            className={classes.editor}
                        />
                        <Slider className={classes.slider} value={scaleValue} onChange={handleScale} min={1} max={5} step={0.01} />
                        <AddPic onClick={handlePicture}>Add Picture</AddPic>
                    </div>}
                </FileInput> */}
            </Container>

    );
};


const LikesContainer = styled.div`
    float: right;
    margin: 0;
`;

const Header = styled.div`
    margin: auto;
    width: 80%;
    clear: both;
    position: absolute;
`;

// const Container = styled.div`
//     //opacity: ${props => props.opacity};
//     //position: fixed;
//     //margin: 5vh auto;
//     min-height: 30%;
//     max-height: 50%;
//     z-index: 100;
//     //top: 50px;
//     //left: 12.5%;

//     //width: 85%;
//     //min-height: 200px;
//     //max-height: 325px;
//     box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
//     //margin: 20px auto;
//     display: flex;
//     flex-direction: column;
//     //position: relative;
//     align-items: center;
//     //background: white;
//     border: none;
//     border-radius: 15px;
//     overflow-y: auto;
//     overflow-x: hidden;
//     text-align: center;
//     padding-bottom: 70px;
// `;

// const TeamName = styled.h4`
//     font-size: 20px;
//     font-weight: 500;
//     margin: 5px auto;
//     color: rgba(0, 0, 0, 0.6);
// `;

const GridText = styled.h6`
    font-size: 15px;
    font-weight: 500;
    margin: 2px auto 10px auto;
    color: lightgrey;
`;

const Season = styled.h5`
    font-size: 20px;
    font-weight: 500;
    margin: 5px auto;
    color: lightgrey;
`;

const Placement = styled.h6`
    font-size: 15px;
    font-weight: 500;
    margin: 2px auto 10px auto;
    color: grey;
`;

const LikeText = styled.h6`
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    color: white;
    margin: 10px 0;
`;

const BasicText = styled.h6`
    font-size: 12px;
    font-weight: 500;
    margin: 5px 0;
    //color: rgba(0, 0, 0, 0.6);
    text-align: center;
    padding: 5px 1px;
    color: white;
`;

const DanceText = styled.h6`
    font-size: 10px;
    font-weight: 500;
    margin: 5px 0;
    color: lightgrey;
`;

const SocialsText = styled.a`
    font-size: 12px;
    font-weight: 500;
    margin: 0 5px;
    //color: black;
    text-decoration: none;
    color: white
`;

const HiddenInput = styled.input`
    opacity: 0;
    width: 0.1px;
    height: 0.1px;
    position: absolute;
`;

const Label = styled.label`
    /* display: block;
    position: relative;
    width: fit-content;
    border-radius: 25px;
    background: linear-gradient(99deg, rgba(198,161,67,1) 0%, rgba(232,216,136,1) 55%, rgba(198,161,67,1) 100%);
    box-shadow: 0 4px 7px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    transition: transform .2s ease-out;
    padding: 10px;
    overflow: hidden;
    font-size: 1.3vh;
    margin: 0 auto; */
`;

const FileInput = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const AddPic = styled.button`
    display: block;
    position: relative;
    width: fit-content;
    border-radius: 25px;
    background: linear-gradient(99deg, rgba(198,161,67,1) 0%, rgba(232,216,136,1) 55%, rgba(198,161,67,1) 100%);
    box-shadow: 0 4px 7px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    transition: transform .2s ease-out;
    padding: 10px;
    overflow: hidden;
    font-size: 10px;
    margin: 0 auto;
    border: none;
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

export default DanceCard;
