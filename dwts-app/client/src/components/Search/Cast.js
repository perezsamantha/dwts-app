import React, { useState, useEffect } from 'react';
import TeamCard from '../Cards/TeamCard';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { searchTeams } from '../../actions/teams';

function Cast(props) {
    const dispatch = useDispatch();
    const input = { search: props.search };

    const teams = useSelector(state => state.teams);

    useEffect(() => {
        dispatch(searchTeams(input));
    }, []);

    return (
        <Container>
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
    align-items: center;
    padding-bottom: 70px;
`;

export default Cast;