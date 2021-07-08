import React from 'react';
import styled from 'styled-components';
import ProfileCard from '../Cards/ProfileCard';
import FansPreview from '../Previews/FansPreview';


function Fans() {


    return (
        <Container>
            <Spacer />
            <FansPreview user={"testing"}/>
            <FansPreview />
            <FansPreview />
            <FansPreview />
            <FansPreview />
            <FansPreview />
            <FansPreview />
            <FansPreview />
            <FansPreview />
            <FansPreview />
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    padding-bottom: 70px;
`;

const Spacer = styled.div`
    margin: 10px;
`;

export default Fans;