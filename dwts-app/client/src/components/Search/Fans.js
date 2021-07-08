import React, { useState } from 'react';
import styled from 'styled-components';
import ProfileCard from '../Cards/ProfileCard';
import FansPreview from '../Previews/FansPreview';


function Fans(props) {
    //console.log(props);
    const [fans, setFans] = useState(null);

    if (props.search == "" || props.search == null) {
        // empty search, load all users
    }

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