import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchPros } from '../../actions/pros';
import { Divider, Grid, Stack, Typography } from '@mui/material';
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
            <Stack mb={1}>
                <Typography>{filteredPros.length} Pros</Typography>
                <Divider />
            </Stack>

            <Grid container spacing={1} justifyContent="center">
                {filteredPros.map((pro, index) => (
                    <Grid
                        key={index}
                        item
                        width={{
                            xs: 1 / 3,
                            sm: 1 / 4,
                            md: 1 / 6,
                            lg: 1 / 8,
                            xl: 1 / 10,
                        }}
                    >
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
