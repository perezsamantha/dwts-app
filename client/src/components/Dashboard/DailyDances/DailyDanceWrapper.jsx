import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { findDailyDance } from '../../../actions/dances';
import DanceCard from './DanceCard';

function DailyDanceWrapper() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(findDailyDance({ day: 'today' }));
    }, [dispatch]);

    return (
        <Box>
            <DanceCard />
        </Box>
    );
}

export default DailyDanceWrapper;
