import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchPros } from '../../actions/pros';
import { CircularProgress, Grid } from '@mui/material';
import ProsPreview from '../Previews/ProsPreview';
import { createLoadingSelector } from '../../api/selectors';

import * as actionType from '../../constants/actionTypes';
import { ResultsContainer } from '../shared/muiStyles';
import { makeStyles } from '@mui/styles';
import { filterPros } from './Filters/filtered';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    progress: {
        margin: 'auto',
    },
});

function Pros(props) {
    const { search, filters } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const pros = useSelector((state) => state.pros.pros);

    const loadingSelector = createLoadingSelector([actionType.PROSEARCH]);
    const loading = useSelector((state) => loadingSelector(state));

    useEffect(() => {
        const input = { search: search };
        dispatch(searchPros(input));
    }, [dispatch, search]);

    let filteredPros = [];
    if (!loading) {
        filteredPros = filterPros(pros, filters);
    }

    return loading ? (
        <CircularProgress className={classes.progress} />
    ) : (
        <ResultsContainer>
            <Grid
                container
                //justify="flex-start"
                className={classes.root}
                spacing={2}
            >
                {filteredPros.map((pro, index) => (
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
        </ResultsContainer>
    );
}

export default Pros;
