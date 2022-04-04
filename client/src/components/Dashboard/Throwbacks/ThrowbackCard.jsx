import { useEffect } from 'react';
import { Card, Divider, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createLoadingSelector } from '../../../api/selectors';
import * as actionType from '../../../constants/actionTypes';
import { getThrowbackData } from '../../../actions/multipleActions';
import Progress from '../../shared/Progress';
import { getThrowbacks } from './throwbackFunctions';

function ThrowbackCard() {
    const dispatch = useDispatch();
    const episodes = useSelector((state) => state.episodes.episodes);
    const tours = useSelector((state) => state.tours.tours);

    const loadingSelector = createLoadingSelector([
        actionType.EPISODESEARCH,
        actionType.TOURSEARCH,
        actionType.FETCHTHROWBACKDATA,
    ]);
    const loading = useSelector((state) => loadingSelector(state));

    useEffect(() => {
        dispatch(getThrowbackData());
    }, [dispatch]);

    let throwbacks;

    if (!loading) {
        throwbacks = getThrowbacks(episodes, tours);
    }

    return (
        <Card elevation={3}>
            <Typography variant="h5">On this day...</Typography>
            <Divider />

            {loading ? (
                <Progress />
            ) : throwbacks.length === 0 ? (
                <Typography>No throwbacks today</Typography>
            ) : (
                <>
                    {throwbacks.map((tb) => (
                        <Typography>
                            {tb.yearsAgo}{' '}
                            {tb.yearsAgo === 1 ? `Year ago` : 'Years ago'} -{' '}
                            {tb.desc}
                        </Typography>
                    ))}
                </>
            )}
        </Card>
    );
}

export default ThrowbackCard;
