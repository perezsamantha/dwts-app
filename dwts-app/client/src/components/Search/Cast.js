import React, { useState, useEffect } from 'react';
import TeamCard from '../Cards/TeamCard';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { searchTeams } from '../../actions/teams';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TeamAdd from '../Teams/TeamAdd';

const useStyles = makeStyles({
    
})

function Cast(props) {
    const classes = useStyles();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const input = { search: props.search };

    const teams = useSelector(state => state.teams);

    useEffect(() => {
        dispatch(searchTeams(input));
    }, []);

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
            {teams.map((team) => (
                <TeamCard team={team} />
            ))}
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
    margin: 15px 0;
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
    margin: 0 auto;
    height: 2px;
    background: rgba(0, 0, 0, 0.3);
`;

export default Cast;