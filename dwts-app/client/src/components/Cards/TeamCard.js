import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Avatar, Button, Grid, makeStyles } from '@material-ui/core';
import TeamSettings from '../Teams/TeamSettings';
import CloseIcon from '@material-ui/icons/Close';

import { Grow } from '@material-ui/core';

const useStyles = makeStyles({
    avi: {
        width: "75px",
        height: "75px",
        marginTop: "15px",
        position: "relative",
    },
    statsGrid: {
        flexGrow: 1,
    },
})

function TeamCard(props) {
    const classes = useStyles();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [team, setTeam] = useState(props.team);
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        setTeam(props.team);
        if (props.show) {
            setOpacity(1);
        } else {
            setOpacity(0);
        }
    }, [props.show, props.team])

    return (
        <Grow in={props.show} >
        <Container opacity={opacity}>
            <Button onClick={props.closeTeam}>
                <CloseIcon />
            </Button>
            <Avatar className={classes.avi} alt={team.celeb} src={team.promoPic}/>
            {user.result.isAdmin && <TeamSettings team={team} />}
            <TeamName>{team.celeb} & {team.pro}</TeamName>
            <Season>Season {team.season}</Season>
            {team.placement && <Placement>{team.placement} Place</Placement>}
            
            <Grid container justify="center" className={classes.statsGrid} spacing={2}>
                <Grid item>
                    <BasicText>DANCES</BasicText>
                    <BasicText>{team.numDances}</BasicText>
                </Grid>
                <Grid item>
                    <BasicText>TENS</BasicText>
                    <BasicText>{team.numTens}</BasicText>
                </Grid>
                <Grid item>
                    <BasicText>PERFECTS</BasicText>
                    <BasicText>{team.numPerfects}</BasicText>
                </Grid>
            </Grid>

            <BasicText>DANCES (IN ORDER)</BasicText>
            <DanceText>CHA CHA - (30) </DanceText>
            <DanceText>SAMBA - (30) </DanceText>
            <DanceText>CHARLESTON - (30) </DanceText>
            <BasicText>PICTURES</BasicText>
        </Container>
        </Grow>
    );
};

const Container = styled.div`
    opacity: ${props => props.opacity};
    position: fixed;
    margin: 5vh auto;
    min-height: 30%;
    max-height: 50%;
    z-index: 100;
    //top: 50px;
    left: 12.5%;

    width: 75%;
    //min-height: 200px;
    //max-height: 325px;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
    //margin: 20px auto;
    display: flex;
    flex-direction: column;
    //position: relative;
    align-items: center;
    background: white;
    border: none;
    border-radius: 15px;
    overflow-y: auto;
    overflow-x: hidden;
    text-align: center;
`;

const TeamName = styled.h4`
    font-size: 20px;
    font-weight: 500;
    margin: 5px auto;
    color: rgba(0, 0, 0, 0.6);
`;

const Season = styled.h5`
    font-size: 15px;
    font-weight: 500;
    margin: 2px auto;
    color: rgba(0, 0, 0, 0.4);
`;

const Placement = styled.h6`
    font-size: 12px;
    font-weight: 500;
    margin: 2px auto;
    color: rgba(0, 0, 0, 0.4);
`;

const BasicText = styled.h6`
    font-size: 12px;
    font-weight: 500;
    margin: 5px 0;
    color: rgba(0, 0, 0, 0.6);
    text-align: center;
    padding: 5px 1px;
`;

const DanceText = styled.h6`
    font-size: 10px;
    font-weight: 500;
    margin: 5px 0;
`;

export default TeamCard;
