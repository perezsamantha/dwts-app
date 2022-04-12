import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, Divider, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    StyledAccordion,
    StyledAccordionDetails,
    StyledAccordionSummary,
} from '../shared/muiStyles';
import { fetchRecentLikes } from '../../actions/activity';
import Progress from '../shared/Progress';
import { timeSince } from './activityFunctions';

function RecentLikes() {
    const dispatch = useDispatch();
    const likes = useSelector((state) => state.activity.likes);
    const loading = useSelector((state) => state.loading.RECENTLIKES);

    useEffect(() => {
        dispatch(fetchRecentLikes());
    }, [dispatch]);

    const getType = (like) => {
        if (like.dance_id) {
            return 'dance';
        } else if (like.team_id) {
            return 'team';
        } else if (like.pro_id) {
            return 'pro';
        } else {
            return '';
        }
    };

    return (
        <Card elevation={3}>
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
                                <Typography key={index}>
                                    {timeSince(like.liked_at)} ago - @
                                    {like.user.username} liked a {getType(like)}
                                </Typography>
                            ))}
                        </Box>
                    )}
                </StyledAccordionDetails>
            </StyledAccordion>
        </Card>
    );
}

export default RecentLikes;
