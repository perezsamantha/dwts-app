import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProfileCard from '../Cards/ProfileCard';
import FansPreview from '../Previews/FansPreview';

import { useDispatch, useSelector } from 'react-redux';
import { searchfans } from '../../actions/fans';
import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    progress: {
        position: "absolute",
        left: "50%",
        top: "50%",
    }
})

function Fans(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    if (props.search === "" || props.search == null) {
        // empty search, load all users
    }

    const fans = useSelector(state => state.fans.fans);
    const loading = useSelector(state => state.fans.loading);

    useEffect(() => {
        const input = { search: props.search };
        dispatch(searchfans(input));
    }, [dispatch, props]);

    const [currentUser, setCurrentUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const openProfile = (id) => {
        setCurrentUser(id);
        setIsOpen(wasOpen => !wasOpen);
    }

    return (
        (loading) ? <CircularProgress className={classes.progress}/> :
        <Container>
            <Spacer />
            {fans.map((fan) => ( 
                <InnerContainer>
                    <FansPreview username={fan.username} openProfile={() => openProfile(fan._id)}/>
                    {isOpen && (fan._id === currentUser) && <ProfileCard username={fan.username}/> }
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