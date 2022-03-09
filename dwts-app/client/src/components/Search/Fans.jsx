import React, { useEffect } from 'react';
import FanPreview from './Previews/FanPreview';

import { useDispatch, useSelector } from 'react-redux';
import { searchUsers } from '../../actions/fans';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { createLoadingSelector } from '../../api/selectors';

import * as actionType from '../../constants/actionTypes';
import { ResultsContainer } from '../shared/muiStyles';
import Progress from '../shared/Progress';

function Fans(props) {
    const { search } = props;
    const dispatch = useDispatch();

    const fans = useSelector((state) => state.users.users);
    const loadingSelector = createLoadingSelector([actionType.USERSEARCH]);
    const loading = useSelector((state) => loadingSelector(state));

    useEffect(() => {
        const input = { search: search };
        dispatch(searchUsers(input));
    }, [dispatch, search]);

    return loading || !Array.isArray(fans) ? (
        <Progress />
    ) : (
        <ResultsContainer>
            <Stack mb={1}>
                <Typography>{fans.length} Fans</Typography>
                <Divider />
            </Stack>

            <Grid container justifyContent="center" spacing={1}>
                {fans.map((fan, index) => (
                    <Grid
                        item
                        key={index}
                        width={{ xs: 1, sm: '30%', lg: '20%' }}
                    >
                        <Link
                            to={{ pathname: `/fans/${fan.id}` }}
                            style={{
                                textDecoration: 'inherit',
                                color: 'inherit',
                            }}
                        >
                            <FanPreview fan={fan} />
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </ResultsContainer>
    );
}

export default Fans;
