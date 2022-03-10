import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchDances } from '../../actions/dances';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';

import 'react-multi-carousel/lib/styles.css';
import DancePreview from './Previews/DancePreview';
import { createLoadingSelector } from '../../api/selectors';

import * as actionType from '../../constants/actionTypes';
import { ResultsContainer } from '../shared/muiStyles';
import { filterDances } from './Filters/filtered';
import Progress from '../shared/Progress';

function Dances(props) {
    const { search, filters } = props;
    const dispatch = useDispatch();
    const dances = useSelector((state) => state.dances.dances);

    const loadingSelector = createLoadingSelector([
        actionType.DANCESEARCH,
        actionType.CELEBSEARCH,
        actionType.PROSEARCH,
        actionType.TEAMSEARCH,
        actionType.SEASONSEARCH,
        actionType.EPISODESEARCH,
        actionType.DANCERSEARCH,
        actionType.JUDGESEARCH,
        actionType.SCORESEARCH,
    ]);
    const loading = useSelector((state) => loadingSelector(state));

    useEffect(() => {
        const input = { search: search };
        dispatch(searchDances(input));
    }, [dispatch, search]);

    let filteredDances = [];

    if (!loading) {
        filteredDances = filterDances(dances, filters);
    }

    return loading ? (
        <Progress />
    ) : (
        <ResultsContainer>
            <Stack mb={1}>
                <Typography>{filteredDances.length} Dances</Typography>
                <Divider />
            </Stack>

            <Grid container justifyContent="center" spacing={1}>
                {filteredDances.map((dance, index) => (
                    <Grid
                        item
                        key={index}
                        width={{
                            xs: 1,
                            sm: 1 / 2,
                            md: 1 / 3,
                            lg: 1 / 4,
                            xl: 1 / 5,
                        }}
                    >
                        <Link
                            key={index}
                            to={{ pathname: `/dances/${dance.id}` }}
                            style={{
                                textDecoration: 'inherit',
                                color: 'inherit',
                            }}
                        >
                            <DancePreview dance={dance} />
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </ResultsContainer>
    );
}

export default Dances;
