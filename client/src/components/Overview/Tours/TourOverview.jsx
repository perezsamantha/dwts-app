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
} from '../../shared/muiStyles';
import { useSelector } from 'react-redux';
import { getShortDate } from '../../shared/functions';

function TourOverview() {
    const tours = useSelector((state) => state.tours.tours);

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
                                {tours.map((tour, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            '&:last-child td, &:last-child th':
                                                { border: 0 },
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {tour.season_id}
                                        </TableCell>
                                        <TableCell>{tour.name}</TableCell>
                                        <TableCell>
                                            <Typography variant="caption">
                                                {getShortDate(tour?.first_show)}{' '}
                                                -{' '}
                                                {getShortDate(tour?.last_show)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{tour.num_shows}</TableCell>
                                        <TableCell>
                                            <Stack direction="row" spacing={1}>
                                                {tour?.pros?.map(
                                                    (pro, index) => (
                                                        <CastPreview
                                                            key={index}
                                                            item={pro}
                                                        />
                                                    )
                                                )}
                                            </Stack>
                                        </TableCell>
                                        <TableCell>
                                            <Stack direction="row" spacing={1}>
                                                {tour?.celebs?.map(
                                                    (celeb, index) => (
                                                        <CastPreview
                                                            key={index}
                                                            item={celeb}
                                                        />
                                                    )
                                                )}
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
