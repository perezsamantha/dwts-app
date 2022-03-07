import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Stack,
    Typography,
} from '@mui/material';
import { seasons } from '../../../constants/dropdowns';
import TeamPreview from './TeamPreview';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function SeasonsOverview() {
    return (
        <Box>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">Seasons Overview</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box mb={1}>
                        <Stack direction="row" spacing={2}>
                            <Typography>#</Typography>
                            <Typography>Weeks</Typography>
                            <Typography>Teams</Typography>
                            <Typography>1st</Typography>
                            <Typography>2nd</Typography>
                            <Typography>3rd</Typography>
                            <Typography>4th</Typography>
                        </Stack>
                    </Box>
                    {seasons.map((season) => (
                        <Box mb={1}>
                            <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                            >
                                <Typography>{season}</Typography>
                                <Typography>12</Typography>
                                <Typography>10</Typography>
                                <TeamPreview />
                                <TeamPreview />
                                <TeamPreview />
                                <TeamPreview />
                            </Stack>
                        </Box>
                    ))}
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

export default SeasonsOverview;
