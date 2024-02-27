import { Box, Card, Divider, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    StyledAccordion,
    StyledAccordionDetails,
    StyledAccordionSummary,
} from '../shared/muiStyles';
import { BsStarFill, BsTable } from 'react-icons/bs';

function AdminOverview() {
    return (
        <Card>
            <StyledAccordion elevation={0}>
                <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">Admin Panel Overview</Typography>
                </StyledAccordionSummary>
                <StyledAccordionDetails sx={{ padding: 0 }}>
                    <Divider />

                    <Stack spacing={0.5} mb={1}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <BsStarFill />
                            <Typography variant="h6">Dashboard</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Box>
                                <BsStarFill
                                    style={{
                                        opacity: 0,
                                    }}
                                />
                            </Box>
                            <Box>
                                <Stack spacing={0.8}>
                                    <Typography>
                                        View daily dances at a glance - it's
                                        easiest if I am the one who manually
                                        selects the dances but I would love if
                                        we all brainstorm together
                                    </Typography>
                                    <Typography>
                                        View recent scores and likes by users -
                                        same feed that can be seen on activity
                                        page in main app
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>
                    </Stack>

                    <Stack spacing={0.5}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <BsTable />
                            <Typography variant="h6">Tables</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Box>
                                <BsTable
                                    style={{
                                        opacity: 0,
                                    }}
                                />
                            </Box>
                            <Box>
                                <Stack spacing={0.8}>
                                    <Typography>
                                        Access tables for all data through the
                                        left-hand drawer
                                    </Typography>
                                    <Typography>
                                        Though only certain fields are required
                                        for each table, the app will have more
                                        success (and we will save time) if you
                                        fill out as many fields as possible🤞
                                    </Typography>
                                    <Typography>
                                        Only I have the ability to edit/delete
                                        users, mods have all other permissions
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

export default AdminOverview;
