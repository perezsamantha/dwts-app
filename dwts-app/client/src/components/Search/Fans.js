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

    const [currentUser, setCurrentUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const openProfile = (id) => {
        //console.log(id);
        setCurrentUser(id);
        setIsOpen(wasOpen => !wasOpen);
    }

    return (
        <Container>
            <Spacer />
            {fans.map((fan) => (
                <InnerContainer>
                    <FansPreview username={fan.username} openProfile={() => openProfile(fan._id)}/>
                    {isOpen && (fan._id == currentUser) && <ProfileCard username={fan.username}/> }
                </InnerContainer>
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

const InnerContainer = styled.div`
    //display: flex;
    //flex-direction: column;
    //margin: 0;
    //padding: 0;
    width: 100%;
`;

export default Fans;