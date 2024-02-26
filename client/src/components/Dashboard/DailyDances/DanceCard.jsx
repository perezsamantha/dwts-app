import { Box, Card, Divider, Link, Stack, Typography } from '@mui/material';
import {
    BsClipboardCheck,
    BsPersonCircle,
    BsCameraVideo,
    BsStars,
    BsArrowRight,
} from 'react-icons/bs';
import { MdOutlineQueueMusic } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { getTotalScore, organizeDancers } from '../../shared/functions';
import Progress from '../../shared/Progress';
import Scoring from '../../shared/Scoring';

function DanceCard() {
    const dance = useSelector((state) => state.dances.dance);
    const loading = useSelector((state) => state.loading.DANCEFIND);

    return (
        <Card>
            <Typography variant="h5">Today's Dance</Typography>
            <Divider />

            {loading ? (
                <Progress />
            ) : dance.id === null || Object.keys(dance).length === 0 ? (
                <Typography>No dance today</Typography>
            ) : (
                <Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <BsStars />
                        <Typography variant="subtitle1">
                            {dance?.style}
                        </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center">
                        <Stack>
                            <MdOutlineQueueMusic />
                        </Stack>
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
                                <Link
                                    href={dance.link}
                                    color="inherit"
                                    underline="always"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    here
                                </Link>
                            </Typography>
                        </Stack>
                    )}

                    <Stack direction="row" spacing={1} alignItems="center">
                        <BsClipboardCheck />
                        <Typography variant="subtitle1">Your Score</Typography>
                    </Stack>

                    <Scoring />
                </Box>
            )}
        </Card>
    );
}

export default DanceCard;
