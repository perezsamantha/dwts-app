import { Box, Button, Link, Rating, Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserScore } from '../../actions/scores';

function Scoring() {
    const dispatch = useDispatch();
    const dance = useSelector((state) => state.dances.dance);
    const [score, setScore] = useState(dance.user_score || 0);
    const [alreadyScored, setAlreadyScored] = useState(false);
    const scoreLoading = useSelector((state) => state.loading.USERSCORE);

    useEffect(() => {
        setScore(dance.user_score);
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
        <Box>
            {alreadyScored && !scoreLoading ? (
                <Typography variant="body2" my={1}>
                    Score of {dance.user_score} has been recorded - change score{' '}
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
                            //defaultValue={dance.user_score || 0}
                            precision={0.5}
                            min={0}
                            max={10}
                            value={score || 0}
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

export default Scoring;
