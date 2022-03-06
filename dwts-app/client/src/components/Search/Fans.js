import React, { useEffect } from 'react';
import FansPreview from '../Previews/FansPreview';

import { useDispatch, useSelector } from 'react-redux';
import { searchUsers } from '../../actions/fans';
import { CircularProgress, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { createLoadingSelector } from '../../api/selectors';

import * as actionType from '../../constants/actionTypes';
import { ResultsContainer } from '../shared/muiStyles';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    progress: {
        position: 'absolute',
        left: '50%',
        top: '50%',
    },
});

function Fans(props) {
    const { search } = props;
    const classes = useStyles();
    const dispatch = useDispatch();

    const fans = useSelector((state) => state.users.users);
    const loadingSelector = createLoadingSelector([actionType.USERSEARCH]);
    const loading = useSelector((state) => loadingSelector(state));

    useEffect(() => {
        const input = { search: search };
        dispatch(searchUsers(input));
    }, [dispatch, search]);

    return loading || !Array.isArray(fans) ? (
        <CircularProgress className={classes.progress} />
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
                            <FansPreview fan={fan} />
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </ResultsContainer>
    );
}

export default Fans;
