import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { findDailyDance } from '../../../actions/dances';
import DanceCard from './DanceCard';
import { DateTime } from 'luxon';

function DailyDanceWrapper() {
    const dispatch = useDispatch();

    useEffect(() => {
        const today = DateTime.now();
        dispatch(findDailyDance({ day: today }));
    }, [dispatch]);

    return (
        <Box>
            <DanceCard />
        </Box>
    );
}

export default DailyDanceWrapper;
