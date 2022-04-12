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
        <Card elevation={3}>
            <StyledAccordion elevation={0}>
                <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">Announcement</Typography>
                </StyledAccordionSummary>
                <StyledAccordionDetails sx={{ padding: 0 }}>
                    <Divider />

                    <Stack direction="row" spacing={1} alignItems="center">
                        <VscVersions />
                        <Typography>Version 1.0 (as of 5/1/22)</Typography>
                    </Stack>
                    <Typography>
                        Future development plans include individual season/tour
                        pages, incorporation of tour dances, interactive
                        rankings amongst teams and dances, and an extensive
                        activity feed.
                    </Typography>
                </StyledAccordionDetails>
            </StyledAccordion>
        </Card>
    );
}

export default Announcement;
