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
import { useDispatch, useSelector } from 'react-redux';
import { getShortDate } from '../../shared/functions';
import { useEffect } from 'react';
import { fetchToursWithoutData } from '../../../actions/tours';
import Progress from '../../shared/Progress';

function TourOverview() {
    const dispatch = useDispatch();
    const tours = useSelector((state) => state.tours.tours);
    const loading = useSelector((state) => state.loading.TOURSEARCH);

    useEffect(() => {
        dispatch(fetchToursWithoutData());
    }, [dispatch]);

    return (
        <Card>
            <StyledAccordion
                elevation={0}
                TransitionProps={{ unmountOnExit: true }}
            >
                <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">Tour Overview</Typography>
                </StyledAccordionSummary>
                <StyledAccordionDetails>
                    <Divider />

                    {loading ? (
                        <Progress />
                    ) : (
                        <TableContainer
                            component={Paper}
                            sx={{
                                backgroundColor: 'transparent',
                            }}
                            elevation={0}
                        >
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Season</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Duration</TableCell>
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
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {tour.season_id}
                                            </TableCell>
                                            <TableCell>{tour.name}</TableCell>
                                            <TableCell>
                                                <Typography variant="caption">
                                                    {getShortDate(
                                                        tour?.first_show
                                                    )}{' '}
                                                    -{' '}
                                                    {getShortDate(
                                                        tour?.last_show
                                                    )}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                >
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
                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                >
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
                    )}
                </StyledAccordionDetails>
            </StyledAccordion>
        </Card>
    );
}

export default TourOverview;
