import { Card, Divider, Stack, Typography } from '@mui/material';
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
                            <Typography>Version 1.0 (as of 5/1/22)</Typography>
                        </Stack>
                        <Typography>
                            With 480 episodes over the course of 30 seasons,
                            getting every dance into the app will take some
                            time. Thank you for your patience as we work on
                            inputting data!
                        </Typography>
                        <Typography>
                            Future development plans include individual
                            season/tour pages, incorporation of tour dances,
                            interactive rankings amongst teams and dances, and
                            an extensive activity feed.
                        </Typography>
                    </Stack>
                </StyledAccordionDetails>
            </StyledAccordion>
        </Card>
    );
}

export default Announcement;
