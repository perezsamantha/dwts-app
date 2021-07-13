import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Avatar, Grid, makeStyles } from '@material-ui/core';
import TeamSettings from '../Teams/TeamSettings';

const useStyles = makeStyles({
    avi: {
        width: "75px",
        height: "75px",
        marginTop: "15px",
        position: "relative",
    },
    statsGrid: {
        flexGrow: 1,
        width: "fit-content",
        height: "auto",
        //overflow: "auto",
        //height: "fit-content",
        //margin: "-10px 0 0.5em 0",
        //padding: "0 1.5em 0 1em",
        //position: "relative"
    },
    row: {
        alignItems: "center",
        //height: "2px",
        //margin: "0",
        //height: "2px",
    },
    item: {
        //margin: "0",
        //height: "0.2em",
    }
})

function TeamCard(props) {
    const classes = useStyles();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [team, setTeam] = useState(props.team);

    useEffect(() => {
        setTeam(props.team);
    }, [props.team])

    return (
        <Container>
            <Avatar className={classes.avi} alt="default" />
            {user.result.isAdmin && <TeamSettings team={team} />}
            <TeamName>{team.celeb} & {team.pro}</TeamName>
            <Season>Season {team.season}</Season>
            {team.placement && <Placement>{team.placement} Place</Placement>}
            <Grid className={classes.statsGrid} container spacing={1}>
                <Grid className={classes.row} container item xs={14} spacing={2}>
                    <Grid className={classes.item} item xs={4}>
                        <BasicText>DANCES</BasicText>
                    </Grid>
                    <Grid className={classes.item} item xs={4}>
                        <BasicText>TENS</BasicText>
                    </Grid>
                    <Grid className={classes.item} item xs={4}>
                        <BasicText>PERFECTS</BasicText>
                    </Grid>
                </Grid>
                <Grid className={classes.row} container item xs={14} spacing={2}>
                    <Grid className={classes.item} item xs={4}>
                        <BasicText>{team.numDances}</BasicText>
                    </Grid>
                    <Grid className={classes.item} item xs={4}>
                        <BasicText>{team.numTens}</BasicText>
                    </Grid>
                    <Grid className={classes.item} item xs={4}>
                        <BasicText>{team.numPerfects}</BasicText>
                    </Grid>
                </Grid>
            </Grid>
            <BasicText>DANCES (IN ORDER)</BasicText>
            <DanceText>CHA CHA - (30) </DanceText>
            <DanceText>SAMBA - (30) </DanceText>
            <DanceText>CHARLESTON - (30) </DanceText>
            <BasicText>PICTURES</BasicText>
        </Container>
    );
};

const Container = styled.div`
    width: 75%;
    min-height: 200px;
    max-height: 300px;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    background: white;
    border: none;
    border-radius: 15px;
    overflow-y: auto;
    overflow-x: hidden;
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

//export default ProfileCard;
export default TeamCard;

/*
import React, { Component } from 'react';
import styled from 'styled-components';
import { Avatar, Grid, withStyles } from '@material-ui/core';
import TeamSettings from '../Teams/TeamSettings';

const useStyles = ({
    avi: {
        width: "75px",
        height: "75px",
        marginTop: "15px",
        position: "relative",
    },
    statsGrid: {
        flexGrow: 1,
        width: "fit-content",
        height: "auto",
        //overflow: "auto",
        //height: "fit-content",
        //margin: "-10px 0 0.5em 0",
        //padding: "0 1.5em 0 1em",
        //position: "relative"
    },
    row: {
        alignItems: "center",
        //height: "2px",
        //margin: "0",
        //height: "2px",
    },
    item: {
        //margin: "0",
        //height: "0.2em",
    }
})

class TeamCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('profile')),
            currentTeam: props.team,
        }
    }

    render() {
        const { classes } = this.props;
        //console.log(this.state.user);
        const team = this.state.currentTeam;

        return (
            <Container>
                <Avatar className={classes.avi} alt="default" />
                {this.state.user.result.isAdmin && <TeamSettings team={team} /> }
                <TeamName>{team.celeb} & {team.pro}</TeamName>
                <Season>Season {team.season}</Season>
                {team.placement && <Placement>{team.placement} Place</Placement>}
                <Grid className={classes.statsGrid} container spacing={1}>
                    <Grid className={classes.row} container item xs={14} spacing={2}>
                        <Grid className={classes.item} item xs={4}>
                            <BasicText>DANCES</BasicText>
                        </Grid>
                        <Grid className={classes.item} item xs={4}>
                            <BasicText>TENS</BasicText>
                        </Grid>
                        <Grid className={classes.item} item xs={4}>
                            <BasicText>PERFECTS</BasicText>
                        </Grid>
                    </Grid>
                    <Grid className={classes.row} container item xs={14} spacing={2}>
                        <Grid className={classes.item} item xs={4}>
                            <BasicText>{team.numDances}</BasicText>
                        </Grid>
                        <Grid className={classes.item} item xs={4}>
                            <BasicText>{team.numTens}</BasicText>
                        </Grid>
                        <Grid className={classes.item} item xs={4}>
                            <BasicText>{team.numPerfects}</BasicText>
                        </Grid>
                    </Grid>
                </Grid>
                <BasicText>DANCES (IN ORDER)</BasicText>
                <DanceText>CHA CHA - (30) </DanceText>
                <DanceText>SAMBA - (30) </DanceText>
                <DanceText>CHARLESTON - (30) </DanceText>
                <BasicText>PICTURES</BasicText>
            </Container>
        );
    };
};

const Container = styled.div`
    width: 75%;
    min-height: 200px;
    max-height: 300px;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    background: white;
    border: none;
    border-radius: 15px;
    overflow-y: auto;
    overflow-x: hidden;
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

//export default ProfileCard;
export default withStyles(useStyles)(TeamCard);
*/