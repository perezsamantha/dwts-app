import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Card, Divider, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    StyledAccordion,
    StyledAccordionDetails,
    StyledAccordionSummary,
} from '../shared/muiStyles';
import { fetchRecentScores } from '../../actions/activity';
import Progress from '../shared/Progress';
import { timeSince } from './activityFunctions';
import { getDanceName } from '../shared/functions';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

function RecentScores() {
    const dispatch = useDispatch();
    const scores = useSelector((state) => state.activity.scores);
    const loading = useSelector((state) => state.loading.RECENTSCORES);

    useEffect(() => {
        dispatch(fetchRecentScores());
    }, [dispatch]);

    const getDance = (score) => {
        if (score.dance_id) {
            return (
                <Link
                    to={{
                        pathname: `/dances/${score.dance_id}`,
                    }}
                    style={{
                        textDecoration: 'inherit',
                        color: 'inherit',
                    }}
                >
                    {getDanceName(score.dance)}
                </Link>
            );
        } else {
            return '';
        }
    };

    return (
        <Card>
            <StyledAccordion elevation={0} defaultExpanded>
                <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">Recent Scores</Typography>
                </StyledAccordionSummary>
                <StyledAccordionDetails sx={{ padding: 0 }}>
                    <Divider />

                    {loading ? (
                        <Progress />
                    ) : (
                        <Box>
                            {scores?.map((score, index) => (
                                <Box key={index}>
                                    <Stack direction="row" spacing={2}>
                                        <Link
                                            to={{
                                                pathname: `/fans/${score.user.username}`,
                                            }}
                                            style={{
                                                textDecoration: 'inherit',
                                                color: 'inherit',
                                            }}
                                        >
                                            <Box>
                                                <LazyLoad height={50}>
                                                    <Avatar
                                                        src={
                                                            score.user.cover_pic
                                                        }
                                                    />
                                                </LazyLoad>
                                            </Box>
                                        </Link>
                                        <Box>
                                            <Stack>
                                                <Typography variant="body2">
                                                    @{score.user.username}{' '}
                                                    scored {getDance(score)} a{' '}
                                                    <strong>
                                                        {score.value}
                                                    </strong>
                                                </Typography>
                                                <Typography
                                                    color="text.secondary"
                                                    variant="caption"
                                                >
                                                    {timeSince(score.scored_at)}{' '}
                                                    ago
                                                </Typography>
                                            </Stack>
                                        </Box>
                                    </Stack>
                                    {index !== scores.length - 1 && <Divider />}
                                </Box>
                            ))}
                        </Box>
                    )}
                </StyledAccordionDetails>
            </StyledAccordion>
        </Card>
    );
}

export default RecentScores;
