import React from 'react';
import ProfileCard from '../Cards/ProfileCard';
import styled from 'styled-components';

function Fans() {
    return (
        <Container>
            <ProfileCard />
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
`;

export default Fans;