import { Box, Card, Divider, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FiSearch, FiBarChart2 } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { BsStars } from 'react-icons/bs';
import {
    StyledAccordion,
    StyledAccordionDetails,
    StyledAccordionSummary,
} from '../sharedStyles';

function Introduction() {
    return (
        <Card elevation={3}>
            <StyledAccordion elevation={0}>
                <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">App Overview</Typography>
                </StyledAccordionSummary>
                <StyledAccordionDetails sx={{ padding: 0 }}>
                    <Divider />

                    <Stack direction="row" spacing={1}>
                        <Box>
                            <BsStars style={{ marginTop: 5 }} />
                        </Box>
                        <Box>
                            <Stack>
                                <Typography variant="h6">Dashboard</Typography>
                                <Typography>
                                    View today's birthdays amongst all
                                    professional dancers, celebrities, and
                                    registered fans
                                </Typography>
                                <Typography>
                                    One dance from a previous season is randomly
                                    generated daily; submit your personal score
                                    to gain points and see how other fans scored
                                    in comparison
                                </Typography>
                                <Typography>
                                    Reminisce on what happened on this day in
                                    the past
                                </Typography>
                            </Stack>
                        </Box>
                    </Stack>

                    <Stack direction="row" spacing={1}>
                        <Box>
                            <FiBarChart2 style={{ marginTop: 5 }} />
                        </Box>
                        <Box>
                            <Stack>
                                <Typography variant="h6">Overview</Typography>
                                <Typography>
                                    View all seasons and tours at a glance
                                </Typography>
                                <Typography>
                                    Statistics about pros, teams, scores, and
                                    ...
                                </Typography>
                            </Stack>
                        </Box>
                    </Stack>

                    <Stack direction="row" spacing={1}>
                        <Box>
                            <FiSearch style={{ marginTop: 5 }} />
                        </Box>
                        <Box>
                            <Stack>
                                <Typography variant="h6">Search</Typography>
                                <Typography>
                                    Search database of dances, teams, pros, and
                                    fans
                                </Typography>
                                <Typography>
                                    Filter / sort for more precise results
                                </Typography>
                                <Typography>
                                    Click each card to view more information
                                </Typography>
                            </Stack>
                        </Box>
                    </Stack>

                    <Stack direction="row" spacing={1}>
                        <Box>
                            <IoMdNotificationsOutline
                                style={{ marginTop: 5 }}
                            />
                        </Box>
                        <Box>
                            <Stack>
                                <Typography variant="h6">
                                    Notifications?
                                </Typography>
                                <Typography>?</Typography>
                            </Stack>
                        </Box>
                    </Stack>

                    <Stack direction="row" spacing={1}>
                        <Box>
                            <AiOutlineUser style={{ marginTop: 5 }} />
                        </Box>
                        <Box>
                            <Stack>
                                <Typography variant="h6">Account</Typography>
                                <Typography>
                                    Your account information
                                </Typography>
                                <Typography>
                                    View your favorite pros, teams, and dances
                                </Typography>
                                <Typography>
                                    Account settings include dark mode toggle
                                </Typography>
                            </Stack>
                        </Box>
                    </Stack>
                </StyledAccordionDetails>
            </StyledAccordion>
        </Card>
    );
}

export default Introduction;
