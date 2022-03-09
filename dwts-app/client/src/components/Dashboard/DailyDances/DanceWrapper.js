import {
    Button,
    Card,
    Divider,
    Link,
    Paper,
    Rating,
    Stack,
    Typography,
} from '@mui/material';
import styled from '@emotion/styled';
import { useState } from 'react';
//import { HiOutlineStar, HiStar } from 'react-icons/hi';
import {
    BsClipboardCheck,
    BsPersonCircle,
    BsCameraVideo,
    BsStars,
    BsArrowRight,
} from 'react-icons/bs';
import { MdOutlineQueueMusic } from 'react-icons/md';

function DanceWrapper() {
    const [score, setScore] = useState(0);
    const [alreadyScored, setAlreadyScored] = useState(false);

    const handleChange = (e, newValue) => {
        setScore(newValue);
    };

    const handleSubmit = () => {
        // dispatch user score with respective dance id once backend is setup
        setAlreadyScored(true);
    };

    const handleRescore = () => {
        setAlreadyScored(false);
    };

    return (
        <Card elevation={3}>
            <Typography variant="h5">Today's Daily Dance</Typography>
            <Divider />

            <Stack direction="row" spacing={1} alignItems="center">
                <BsStars />
                <Typography variant="subtitle1">Cha Cha</Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
                <MdOutlineQueueMusic />
                <Typography variant="subtitle1">
                    Came Here for Love by Sigala
                </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
                <BsArrowRight />
                <Typography variant="subtitle1">
                    Season 30 &#8226; Week 10 &#8226; 30/30
                </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
                <BsPersonCircle />
                <Typography>Danced by...</Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
                <BsCameraVideo />
                <Typography variant="subtitle1">
                    Watch the dance{' '}
                    <Link href="#" underline="hover">
                        here
                    </Link>
                </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
                <BsClipboardCheck />
                <Typography variant="subtitle1">Your Score</Typography>
            </Stack>

            {alreadyScored ? (
                <Stack direction="row" spacing={1} alignItems="center">
                    {/* <BsClipboardCheck /> */}
                    <Typography variant="body2">
                        Score of {score} has been recorded - change score{' '}
                        <Link onClick={handleRescore} underline="hover">
                            here.
                        </Link>
                    </Typography>
                </Stack>
            ) : (
                <>
                    <Stack direction="row" spacing={2} mb={1}>
                        <StyledRating
                            defaultValue={0.5}
                            precision={0.5}
                            max={10}
                            value={score}
                            onChange={handleChange}
                            // icon={<HiStar />}
                            // emptyIcon={<HiOutlineStar />}
                        />
                        {score !== 0 && <Typography>{score}</Typography>}
                    </Stack>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={handleSubmit}
                    >
                        Submit Score
                    </Button>
                </>
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

export default DanceWrapper;
