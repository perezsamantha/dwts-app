import React, { useState, useEffect } from 'react';
import TeamCard from '../Cards/TeamCard';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { searchTeams } from '../../actions/teams';
import { Grid, makeStyles, CircularProgress } from '@material-ui/core';
import TeamAdd from '../Teams/TeamAdd';
import TeamsPreview from '../Previews/TeamsPreview';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    progress: {
        margin: "auto",
    }
})

function Cast(props) {
    const classes = useStyles();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [currentTeam, setCurrentTeam] = useState(null);
    //const [isOpen, setIsOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const history = useHistory();
    const input = { search: props.search };

    const teams = useSelector(state => state.teams);

    useEffect(() => {
        dispatch(searchTeams(input));
        //props.backgroundScroll(show);
        setLoading(false);
    }, [show]);

    const openTeam = (team) => {
        //console.log(team);
        //history.push(`/cast/teams/${team._id}`);
        //setCurrentTeam(team);
        //setShow(true);
    }

    return (
        <Container>
            <Spacer />
            <SubtitleContainer>
                <Subtitle>Teams</Subtitle>
                {user.result.isAdmin && 
                    <AdminAdd>
                        <TeamAdd />
                    </AdminAdd>
                }
            </SubtitleContainer>
            <Divider />

            {(!teams.length || teams[0]?.email != null) ? <CircularProgress className={classes.progress}/> :
            <ContentContainer>
                <Grid container justify="center" className={classes.root} spacing={2}>
                    {teams.map((team, index) => (
                        <Grid key={index} item>
                        <InnerContainer>
                            <Link to={{ pathname: `/search/cast/teams/${team._id}` }} >
                            <TeamsPreview team={team}/>
                        </Link>
                        </InnerContainer>
                        </Grid>
                    ))}
                </Grid>
            </ContentContainer>
            }
            {show && <TeamCard team={teams[currentTeam]} show={show} closeTeam={() => setShow(false)} />}
            
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    position: relative;
    //align-items: center;
    padding-bottom: 70px;
`;

const Spacer = styled.div`
    margin: 15px;
`;

const SubtitleContainer = styled.div`
    clear: both;
    margin: 0 auto;
    width: 75%;
`;

const Subtitle = styled.h2`
    float: left;
    color: rgba(0, 0, 0, 0.8);
    margin: 2px;
`;

const AdminAdd = styled.h2`
    float: right;
    margin: 2px;
`;

const Divider = styled.div`
    width: 75%;
    margin: 10px auto;
    height: 2px;
    background: rgba(0, 0, 0, 0.3);
`;

const ContentContainer = styled.div`
    width: 75%;
    margin: 10px auto;
`;

const InnerContainer = styled.div`
    width: 100%;
`;

export default Cast;