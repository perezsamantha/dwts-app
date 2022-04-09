import { Box, Card, Divider, Link, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import {
    BsClipboardCheck,
    BsPersonCircle,
    BsCameraVideo,
    BsStars,
    BsArrowRight,
} from 'react-icons/bs';
import { MdOutlineQueueMusic } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { findDailyDance } from '../../actions/dances';
import {
    getAverageUserScore,
    getTotalScore,
    organizeDancers,
} from '../shared/functions';
import Progress from '../shared/Progress';

function DanceCard() {
    const dispatch = useDispatch();
    const dance = useSelector((state) => state.dances.dance);
    const loading = useSelector((state) => state.loading.DANCEFIND);

    useEffect(() => {
        dispatch(findDailyDance({ day: 'yesterday' }));
    }, [dispatch]);

    return (
        <Card elevation={3}>
            <Typography variant="h5">Yesterday's Dance</Typography>
            <Divider />

            {loading ? (
                <Progress />
            ) : Object.keys(dance).length === 0 ? (
                <Typography>No dance yesterday</Typography>
            ) : (
                <Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <BsStars />
                        <Typography variant="subtitle1">
                            {dance?.style}
                        </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center">
                        <MdOutlineQueueMusic />
                        <Typography variant="subtitle1">
                            {dance.song_title}{' '}
                            {dance?.song_artist && `by ${dance.song_artist}`}
                        </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center">
                        <BsArrowRight />
                        <Typography variant="subtitle1">
                            Season {dance.episode.season_id} &#8226; Week{' '}
                            {dance.episode.week}{' '}
                            {dance.episode?.night &&
                                `\u2022 ${dance.episode.night}`}{' '}
                            {dance.scores?.length !== 0 &&
                                `\u2022 ${getTotalScore(dance.scores)}`}
                        </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center">
                        <BsPersonCircle />
                        {dance.dancers.length !== 0 && (
                            <Box>
                                <Typography>
                                    {organizeDancers(dance.dancers).join(', ')}
                                </Typography>
                            </Box>
                        )}
                    </Stack>

                    {dance?.link && (
                        <Stack direction="row" spacing={1} alignItems="center">
                            <BsCameraVideo />
                            <Typography variant="subtitle1">
                                Watch the dance{' '}
                                <Link href={dance.link} underline="hover">
                                    here
                                </Link>
                            </Typography>
                        </Stack>
                    )}

                    {dance.user_scores.length > 0 && (
                        <Box>
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >
                                <BsClipboardCheck />
                                {dance.user_score ? (
                                    <Typography variant="subtitle1">
                                        Your Score: {dance.user_score}
                                    </Typography>
                                ) : (
                                    <Typography variant="subtitle1">
                                        You did not submit a score
                                    </Typography>
                                )}
                            </Stack>

                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >
                                <Box>
                                    <BsClipboardCheck style={{ opacity: 0 }} />
                                </Box>
                                <Box>
                                    <Typography variant="subtitle1">
                                        Average Fan Score:{' '}
                                        {getAverageUserScore(dance.user_scores)}
                                    </Typography>

                                    <Typography variant="body2">
                                        (Based on {dance.user_scores.length}{' '}
                                        {dance.user_scores.length === 1
                                            ? 'score'
                                            : 'scores'}
                                        )
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                    )}
                </Box>
            )}
        </Card>
    );
}

export default DanceCard;
