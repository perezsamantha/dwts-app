import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FansPreview from '../Previews/FansPreview';

import { useDispatch, useSelector } from 'react-redux';
import { searchUsers } from '../../actions/fans';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

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

    const fans = useSelector(state => state.fans.fans);
    const loading = useSelector(state => state.fans.loading);

    useEffect(() => {
        const input = { search: props.search };
        dispatch(searchUsers(input));
    }, [dispatch, props]);

    return (
        loading || !Array.isArray(fans ) ? <CircularProgress className={classes.progress}/> :
        <Container>
            <Spacer />
            {fans.map((fan, index) => ( 
                <InnerContainer>
                    <Link key={index} to={{ pathname: `/fans/${fan._id}` }} style={{ textDecoration: "none" }} >
                        <FansPreview username={fan.username} />
                    </Link>
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