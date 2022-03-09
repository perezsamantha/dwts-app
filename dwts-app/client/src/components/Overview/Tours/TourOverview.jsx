import {
    Card,
    Divider,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import CastPreview from './CastPreview';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    StyledAccordion,
    StyledAccordionDetails,
    StyledAccordionSummary,
} from '../../Dashboard/sharedStyles';
import { useSelector } from 'react-redux';

function TourOverview() {
    const seasons = useSelector((state) => state.seasons.seasons);
    return (
        <Card elevation={3}>
            <StyledAccordion elevation={0}>
                <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">Tour Overview</Typography>
                </StyledAccordionSummary>
                <StyledAccordionDetails>
                    <Divider />

                    <TableContainer
                        component={Paper}
                        sx={{ backgroundColor: 'transparent' }}
                        elevation={0}
                    >
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Season</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Duration</TableCell>
                                    <TableCell>Shows</TableCell>
                                    <TableCell>Pros</TableCell>
                                    <TableCell>Celebs</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {seasons.map((season, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            '&:last-child td, &:last-child th':
                                                { border: 0 },
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {season.id}
                                        </TableCell>
                                        <TableCell>
                                            Dare to Be Different
                                        </TableCell>
                                        <TableCell>1/7/22 - 3/28/22</TableCell>
                                        <TableCell>71</TableCell>
                                        <TableCell>
                                            <Stack direction="row" spacing={1}>
                                                <CastPreview />
                                                <CastPreview />
                                                <CastPreview />
                                                <CastPreview />
                                            </Stack>
                                        </TableCell>
                                        <TableCell>
                                            <Stack direction="row" spacing={1}>
                                                <CastPreview />
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </StyledAccordionDetails>
            </StyledAccordion>
        </Card>
    );
}

export default TourOverview;
