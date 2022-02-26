import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPros, searchPros } from '../../actions/pros';
import { makeStyles, CircularProgress, Grid } from '@material-ui/core';
import ProsPreview from '../Previews/ProsPreview';
import { createLoadingSelector } from '../../api/selectors';

import * as actionType from '../../constants/actionTypes';


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    progress: {
        margin: "auto",
    }
})

function Pros(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const pros = useSelector(state => state.data.pros);

    //const loadingSelector = createLoadingSelector([actionType.PROSEARCH]);
    //const isFetching = useSelector((state) => loadingSelector(state));
    const loading = useSelector(state => state.loading.PROSEARCH);

    useEffect(() => {
        const input = { search: props.search };
        dispatch(searchPros(input));
        //dispatch(fetchPros());
    }, [dispatch, props]);

    return (
        <Container>
            { loading ? <CircularProgress className={classes.progress} /> :

                <ContentContainer>
                    <Grid container justify="flex-start" className={classes.root} spacing={2}>
                        {pros.map((pro, index) => (
                            <Grid key={index} item>
                                <InnerContainer>
                                    <Link to={{ pathname: `/pros/${pro.id}` }} style={{ textDecoration: "none" }} >
                                        <ProsPreview pro={pro} />
                                    </Link>
                                </InnerContainer>
                            </Grid>
                        ))}
                    </Grid>
                </ContentContainer>
            }
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    position: relative;
    padding-bottom: 70px;
`;

const ContentContainer = styled.div`
    width: 75%;
    margin: 15px auto;
`;

const InnerContainer = styled.div`
    width: 100%;
    float: left;
`;

export default Pros;