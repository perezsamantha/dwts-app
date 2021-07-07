import React from 'react';
import TeamCard from '../Cards/TeamCard';
import styled from 'styled-components';

function Cast() {
    return (
        <Container>
            <TeamCard />
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