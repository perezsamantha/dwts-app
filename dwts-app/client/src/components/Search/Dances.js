import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchDances } from '../../actions/dances';
import { CircularProgress, Divider } from '@mui/material';

import 'react-multi-carousel/lib/styles.css';
import DancesPreview from '../Previews/DancesPreview';
import { createLoadingSelector } from '../../api/selectors';

import * as actionType from '../../constants/actionTypes';
import { makeStyles } from '@mui/styles';
import { ResultsContainer } from '../shared/muiStyles';
import { filterDances } from './Filters/filtered';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    progress: {
        margin: 'auto',
    },
});

function Dances(props) {
    const { search, filters } = props;
    const classes = useStyles();
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
        <CircularProgress className={classes.progress} />
    ) : (
        <ResultsContainer>
            {filteredDances.map((dance, index) => (
                <Link
                    key={index}
                    to={{ pathname: `/dances/${dance.id}` }}
                    style={{
                        textDecoration: 'inherit',
                        color: 'inherit',
                    }}
                >
                    <DancesPreview dance={dance} />
                    {/* move divider outside of link? if so, need to wrap in div with key */}
                    <Divider />
                </Link>
            ))}
        </ResultsContainer>
    );
}

export default Dances;
