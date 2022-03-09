import React, { useEffect } from 'react';
import FanPreview from './Previews/FanPreview';

import { useDispatch, useSelector } from 'react-redux';
import { searchUsers } from '../../actions/fans';
import { Grid } from '@mui/material';
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
            <Grid container justifyContent="center" spacing={2}>
                {fans.map((fan, index) => (
                    <Grid item key={index}>
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
