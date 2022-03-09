import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchPros } from '../../actions/pros';
import { Grid } from '@mui/material';
import ProPreview from './Previews/ProPreview';
import { createLoadingSelector } from '../../api/selectors';

import * as actionType from '../../constants/actionTypes';
import { ResultsContainer } from '../shared/muiStyles';
import { filterPros } from './Filters/filtered';
import Progress from '../shared/Progress';

function Pros(props) {
    const { search, filters } = props;
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
        <Progress />
    ) : (
        <ResultsContainer>
            <Grid container spacing={1} justifyContent="center">
                {filteredPros.map((pro, index) => (
                    <Grid key={index} item>
                        <Link
                            to={{ pathname: `/pros/${pro.id}` }}
                            style={{
                                textDecoration: 'inherit',
                                color: 'inherit',
                            }}
                        >
                            <ProPreview pro={pro} />
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </ResultsContainer>
    );
}

export default Pros;
