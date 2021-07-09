import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProfileCard from '../Cards/ProfileCard';
import FansPreview from '../Previews/FansPreview';

import { useDispatch, useSelector } from 'react-redux';
import { searchfans } from '../../actions/fans';

function Fans(props) {
    //console.log(props);
    const [listFans, setListFans] = useState(null);
    const dispatch = useDispatch();
    const input = { search: props.search };

    if (props.search == "" || props.search == null) {
        // empty search, load all users
    }

    const fans = useSelector((state) => state.fans);

    useEffect(() => {
        dispatch(searchfans(input));
    }, []);

    return (
        <Container>
            <Spacer />
            {fans.map((fan) => (
                <FansPreview user={fan.email} />
            ))}
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