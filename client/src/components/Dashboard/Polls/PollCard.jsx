import { useEffect } from 'react';
import { Card, Divider, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Progress from '../../shared/Progress';
import { fetchPolls } from '../../../actions/polls';
import Poll from './Poll';

function PollCard() {
    const dispatch = useDispatch();

    const polls = useSelector((state) => state.polls.polls);
    const user = useSelector((state) => state.auth.authData);
    const loading = useSelector((state) => state.loading.POLLSEARCH);

    useEffect(() => {
        dispatch(fetchPolls());
    }, [dispatch]);

    return (
        <Card>
            <Typography variant="h5">This Week's Polls</Typography>
            <Divider />

            {loading ? (
                <Progress />
            ) : polls.length === 0 ? (
                <Typography>No polls this week</Typography>
            ) : (
                <>
                    <Stack spacing={3}>
                        {polls.map((poll, index) => (
                            <Poll key={index} poll={poll} user={user} />
                        ))}
                    </Stack>
                </>
            )}
        </Card>
    );
}

export default PollCard;
