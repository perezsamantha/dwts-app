import { Card, Divider, Link, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    StyledAccordion,
    StyledAccordionDetails,
    StyledAccordionSummary,
} from '../shared/muiStyles';
import { VscVersions } from 'react-icons/vsc';

function Announcement() {
    return (
        <Card>
            <StyledAccordion elevation={0}>
                <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">Announcement</Typography>
                </StyledAccordionSummary>
                <StyledAccordionDetails sx={{ padding: 0 }}>
                    <Divider />

                    <Stack spacing={1}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <VscVersions />
                            <Typography>
                                Version 2.0 (as of 10/28/24)
                            </Typography>
                        </Stack>
                        <Typography>
                            I am happy to announce that every team, dance, and
                            individual score across 33 seasons (+ juniors) has
                            been entered in the app!
                        </Typography>
                        <Typography>
                            Please note that some YouTube/DailyMotion links may
                            be broken as many dances were entered a while back
                            and those links may been have deleted/privated. I
                            will do my best to update these links as soon as
                            possible.
                        </Typography>
                        <Typography>
                            Be sure to use the scoring feature to submit your
                            personal score for dances and check out the DWTS
                            Simulator located{' '}
                            <Link
                                href={'https://www.dancingsim.app'}
                                color="inherit"
                                underline="always"
                                target="_blank"
                                rel="noopener"
                            >
                                here
                            </Link>
                            ! 🪩✨
                        </Typography>
                    </Stack>
                </StyledAccordionDetails>
            </StyledAccordion>
        </Card>
    );
}

export default Announcement;
