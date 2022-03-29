import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findDailyDance } from '../../../actions/dances';
import DanceCard from './DanceCard';

function DailyDanceWrapper() {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading.DANCEFIND);

    useEffect(() => {
        dispatch(findDailyDance());
    }, [dispatch]);

    return (
        !loading && (
            <Box>
                <DanceCard />
            </Box>
        )
    );
}

export default DailyDanceWrapper;
