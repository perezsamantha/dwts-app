import {
    Box,
    Button,
    Card,
    Divider,
    Link,
    Rating,
    Stack,
    Typography,
} from '@mui/material';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import {
    BsClipboardCheck,
    BsPersonCircle,
    BsCameraVideo,
    BsStars,
    BsArrowRight,
} from 'react-icons/bs';
import { MdOutlineQueueMusic } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalScore, organizeDancers } from '../../shared/functions';
import { setUserScore } from '../../../actions/scores';
import Progress from '../../shared/Progress';

function DanceCard() {
    const dispatch = useDispatch();
    const dance = useSelector((state) => state.dances.dance);
    const [score, setScore] = useState(dance.user_score || 0);
    const [alreadyScored, setAlreadyScored] = useState(false);
    const scoreLoading = useSelector((state) => state.loading.USERSCORE);
    const loading = useSelector((state) => state.loading.DANCEFIND);

    useEffect(() => {
        setAlreadyScored(dance.user_score ? true : false);
    }, [dispatch, dance.user_score]);

    const handleChange = (e, newValue) => {
        setScore(newValue);
    };

    const handleSubmit = () => {
        if (!score) {
            return;
        }

        dispatch(setUserScore(dance.id, { value: score }));
        setAlreadyScored(true);
    };

    const handleRescore = () => {
        setAlreadyScored(false);
    };

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
                                <Link
                                    href={dance.link}
                                    color="inherit"
                                    underline="always"
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

                    {alreadyScored && !scoreLoading ? (
                        <Typography variant="body2" my={1}>
                            Score of {dance.user_score} has been recorded -
                            change score{' '}
                            <Link
                                onClick={handleRescore}
                                color="inherit"
                                underline="always"
                                sx={{ cursor: 'pointer' }}
                            >
                                here.
                            </Link>
                        </Typography>
                    ) : (
                        <Box>
                            <Stack direction="row" spacing={2} my={1}>
                                <StyledRating
                                    defaultValue={dance.user_score || 0}
                                    precision={0.5}
                                    min={0}
                                    max={10}
                                    value={score}
                                    onChange={handleChange}
                                />
                                <Typography>{score}</Typography>
                            </Stack>
                            <Button size="small" onClick={handleSubmit}>
                                Submit Score
                            </Button>
                        </Box>
                    )}
                </Box>
            )}
        </Card>
    );
}

const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconFilled': {
        color: theme.palette.primary.main,
    },
    '& .MuiRating-iconHover': {
        color: theme.palette.primary.main,
    },
}));

export default DanceCard;
