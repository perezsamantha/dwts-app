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
                            <Typography>Version 2.0 (as of 2/24/22)</Typography>
                        </Stack>
                        <Typography>
                            Hello again everybody! I can't thank you enough for
                            being here and supporting this app. This project is
                            still a work in progress and I hope to continue
                            improving it during off-season and as we head into
                            season 33.
                        </Typography>
                        <Typography>
                            With 500 episodes over the course of 32 seasons,
                            getting every dance into the app will take some
                            time. Thank you for your patience as we work on
                            inputting data!
                        </Typography>
                        <Typography>
                            Be sure to check out the newly released DWTS
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
