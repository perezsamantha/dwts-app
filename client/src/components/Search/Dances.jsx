import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchDances } from '../../actions/dances';
import { Box, Divider, Fade, Grid, Stack, Typography } from '@mui/material';

import 'react-multi-carousel/lib/styles.css';
import DancePreview from './Previews/DancePreview';
import { createLoadingSelector } from '../../api/selectors';

import * as actionType from '../../constants/actionTypes';
import { ResultsContainer } from '../shared/muiStyles';
import { filterDances } from './Filters/filtered';
import Progress from '../shared/Progress';
import { motion } from 'framer-motion';

function Dances(props) {
    const { search } = props;
    const dispatch = useDispatch();
    const dances = useSelector((state) => state.dances.dances);
    const filters = useSelector((state) => state.dances.filters);
    const [slide, setSlide] = useState(false);

    const loadingSelector = createLoadingSelector([actionType.DANCESEARCH]);
    const loading = useSelector((state) => loadingSelector(state));

    useEffect(() => {
        const input = { search: search };
        dispatch(searchDances(input));
        setSlide(true);
    }, [dispatch, search]);

    let filteredDances = [];

    if (!loading) {
        filteredDances = filterDances(dances, filters);
    }

    return loading ? (
        <Progress />
    ) : (
        <Fade in={slide} style={{ transitionDuration: '0.5s' }}>
            <ResultsContainer>
                <Stack mb={1}>
                    <Typography>{filteredDances.length} Dances</Typography>
                    <Divider />
                </Stack>

                <Grid container justifyContent="center" spacing={1.5}>
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
                                <Box
                                    component={motion.div}
                                    whileHover={{
                                        scale: 1.025,
                                        transition: { duration: 0.3 },
                                    }}
                                    whileTap={{
                                        scale: 1.05,
                                        transition: { duration: 0.3 },
                                    }}
                                >
                                    <DancePreview dance={dance} />
                                </Box>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </ResultsContainer>
        </Fade>
    );
}

export default Dances;
