import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPros, searchPros } from '../../actions/pros';
import { makeStyles, CircularProgress, Grid } from '@material-ui/core';
import ProsPreview from '../Previews/ProsPreview';
import { createLoadingSelector } from '../../api/selectors';

import * as actionType from '../../constants/actionTypes';
import { Container, ContentContainer } from '../shared/muiStyles';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    progress: {
        margin: 'auto',
    },
});

function Pros(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const pros = useSelector((state) => state.data.pros);

    //const loadingSelector = createLoadingSelector([actionType.PROSEARCH]);
    //const isFetching = useSelector((state) => loadingSelector(state));
    const loading = useSelector((state) => state.loading.PROSEARCH);

    useEffect(() => {
        const input = { search: props.search };
        dispatch(searchPros(input));
        //dispatch(fetchPros());
    }, [dispatch, props]);

    return (
        <Container elevation={1}>
            {loading ? (
                <CircularProgress className={classes.progress} />
            ) : (
                <ContentContainer elevation={1}>
                    <Grid
                        container
                        justify="flex-start"
                        className={classes.root}
                        spacing={2}
                    >
                        {pros.map((pro, index) => (
                            <Grid key={index} item>
                                <Link
                                    to={{ pathname: `/pros/${pro.id}` }}
                                    style={{
                                        textDecoration: 'inherit',
                                        color: 'inherit',
                                    }}
                                >
                                    <ProsPreview pro={pro} />
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </ContentContainer>
            )}
        </Container>
    );
}

export default Pros;
