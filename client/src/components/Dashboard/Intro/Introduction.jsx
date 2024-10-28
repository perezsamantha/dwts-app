import { Box, Card, Divider, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FiSearch, FiBarChart2, FiActivity } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';
import { BsStars } from 'react-icons/bs';
import {
    StyledAccordion,
    StyledAccordionDetails,
    StyledAccordionSummary,
} from '../../shared/muiStyles';

function Introduction() {
    return (
        <Card>
            <StyledAccordion elevation={0} defaultExpanded>
                <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">App Overview</Typography>
                </StyledAccordionSummary>
                <StyledAccordionDetails sx={{ padding: 0 }}>
                    <Divider />

                    <Stack spacing={0.5} mb={1}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <BsStars />
                            <Typography variant="h6">Dashboard</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Box>
                                <BsStars
                                    style={{
                                        opacity: 0,
                                    }}
                                />
                            </Box>
                            <Box>
                                <Stack spacing={0.8}>
                                    <Typography>
                                        Today's birthdays among all professional
                                        dancers, celebrities, and fans
                                    </Typography>
                                    <Typography>
                                        One dance from a previous season is
                                        generated daily for fans to score
                                    </Typography>
                                    <Typography>
                                        Reminisce on today's throwbacks
                                    </Typography>
                                    <Typography>
                                        Vote in this week's polls
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>
                    </Stack>

                    <Stack spacing={0.5} mb={1}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <FiBarChart2 />
                            <Typography variant="h6">Overview</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Box>
                                <FiBarChart2
                                    style={{
                                        opacity: 0,
                                    }}
                                />
                            </Box>
                            <Box>
                                <Stack spacing={0.8}>
                                    <Typography>
                                        All seasons and tours at a glance
                                    </Typography>
                                    <Typography>
                                        Statistics about teams and pros
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>
                    </Stack>

                    <Stack spacing={0.5} mb={1}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <FiSearch />
                            <Typography variant="h6">Search</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Box>
                                <FiSearch
                                    style={{
                                        opacity: 0,
                                    }}
                                />
                            </Box>
                            <Box>
                                <Stack spacing={0.8}>
                                    <Typography>
                                        Database of dances, teams, pros, and
                                        fans
                                    </Typography>
                                    <Typography>
                                        Filter and sort for more precise results
                                    </Typography>
                                    <Typography>
                                        Click each dance/team/pro for more
                                        information and like your favorites
                                    </Typography>
                                    <Typography>
                                        Submit your personal score for dances
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>
                    </Stack>

                    <Stack spacing={0.5} mb={1}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <FiActivity />
                            <Typography variant="h6">Activity</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Box>
                                <FiActivity
                                    style={{
                                        opacity: 0,
                                    }}
                                />
                            </Box>
                            <Box>
                                <Stack spacing={0.8}>
                                    <Typography>
                                        Recent scores and likes by fans
                                    </Typography>
                                    <Typography>
                                        Results from yesterday's daily dance and
                                        recent polls
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>
                    </Stack>

                    <Stack spacing={0.5}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <AiOutlineUser />
                            <Typography variant="h6">Account</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Box>
                                <AiOutlineUser
                                    style={{
                                        opacity: 0,
                                    }}
                                />
                            </Box>
                            <Box>
                                <Stack spacing={0.8}>
                                    <Typography>
                                        Your profile (including favorite
                                        pros/teams/dances)
                                    </Typography>
                                    <Typography>
                                        Account settings (including dark mode
                                        toggle)
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>
                    </Stack>
                </StyledAccordionDetails>
            </StyledAccordion>
        </Card>
    );
}

export default Introduction;
