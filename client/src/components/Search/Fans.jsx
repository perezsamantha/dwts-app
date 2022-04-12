import React, { useEffect, useState } from 'react';
import FanPreview from './Previews/FanPreview';

import { useDispatch, useSelector } from 'react-redux';
import { searchUsers } from '../../actions/users';
import { Box, Divider, Fade, Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { createLoadingSelector } from '../../api/selectors';

import * as actionType from '../../constants/actionTypes';
import { ResultsContainer } from '../shared/muiStyles';
import Progress from '../shared/Progress';
import { filterFans } from './Filters/filtered';
import { motion } from 'framer-motion';

function Fans(props) {
    const { search } = props;
    const dispatch = useDispatch();
    const fans = useSelector((state) => state.users.users);
    const filters = useSelector((state) => state.users.filters);
    const [slide, setSlide] = useState(false);

    const loadingSelector = createLoadingSelector([actionType.USERSEARCH]);
    const loading = useSelector((state) => loadingSelector(state));

    useEffect(() => {
        const input = { search: search };
        dispatch(searchUsers(input));
        setSlide(true);
    }, [dispatch, search]);

    let filteredFans = [];

    if (!loading) {
        filteredFans = filterFans(fans, filters);
    }

    return loading || !Array.isArray(fans) ? (
        <Progress />
    ) : (
        <Fade in={slide} style={{ transitionDuration: '0.5s' }}>
            <ResultsContainer>
                <Stack mb={1}>
                    <Typography>{filteredFans.length} Fans</Typography>
                    <Divider />
                </Stack>

                <Grid container justifyContent="center" spacing={1}>
                    {filteredFans.map((fan, index) => (
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
                                to={{ pathname: `/fans/${fan.username}` }}
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
                                    <FanPreview fan={fan} />
                                </Box>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </ResultsContainer>
        </Fade>
    );
}

export default Fans;
