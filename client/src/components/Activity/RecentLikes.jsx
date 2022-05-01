import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Card, Divider, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    StyledAccordion,
    StyledAccordionDetails,
    StyledAccordionSummary,
} from '../shared/muiStyles';
import { fetchRecentLikes } from '../../actions/activity';
import Progress from '../shared/Progress';
import { timeSince } from './activityFunctions';
import {
    getDanceName,
    getFullName,
    getFullTeamName,
} from '../shared/functions';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

function RecentLikes() {
    const dispatch = useDispatch();
    const likes = useSelector((state) => state.activity.likes);
    const loading = useSelector((state) => state.loading.RECENTLIKES);

    useEffect(() => {
        dispatch(fetchRecentLikes());
    }, [dispatch]);

    const getType = (like) => {
        if (like.dance_id) {
            return getDanceName(like.dance);
        } else if (like.team_id) {
            return getFullTeamName(like.team.celeb, like.team.pro);
        } else if (like.pro_id) {
            return getFullName(like.pro);
        } else {
            return '';
        }
    };

    return (
        <Card>
            <StyledAccordion elevation={0} defaultExpanded>
                <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">Recent Likes</Typography>
                </StyledAccordionSummary>
                <StyledAccordionDetails sx={{ padding: 0 }}>
                    <Divider />

                    {loading ? (
                        <Progress />
                    ) : (
                        <Box>
                            {likes.map((like, index) => (
                                <Box key={index}>
                                    <Stack direction="row" spacing={2}>
                                        <Box>
                                            <LazyLoad height={50}>
                                                <Avatar
                                                    src={like.user.cover_pic}
                                                />
                                            </LazyLoad>
                                        </Box>
                                        <Box>
                                            <Stack>
                                                <Typography variant="body2">
                                                    <Link
                                                        to={{
                                                            pathname: `/fans/${like.user.username}`,
                                                        }}
                                                        style={{
                                                            textDecoration:
                                                                'inherit',
                                                            color: 'inherit',
                                                        }}
                                                    >
                                                        @{like.user.username}{' '}
                                                    </Link>
                                                    liked {getType(like)}
                                                </Typography>
                                                <Typography
                                                    color="text.secondary"
                                                    variant="caption"
                                                >
                                                    {timeSince(like.liked_at)}{' '}
                                                    ago
                                                </Typography>
                                            </Stack>
                                        </Box>
                                    </Stack>
                                    {index !== likes.length - 1 && <Divider />}
                                </Box>
                            ))}
                        </Box>
                    )}
                </StyledAccordionDetails>
            </StyledAccordion>
        </Card>
    );
}

export default RecentLikes;
