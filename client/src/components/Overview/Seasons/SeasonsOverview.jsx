import {
    Card,
    Divider,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import TeamPreview from './TeamPreview';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    StyledAccordion,
    StyledAccordionDetails,
    StyledAccordionSummary,
} from '../../shared/muiStyles';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchSeasons } from '../../../actions/seasons';
import Progress from '../../shared/Progress';

function SeasonsOverview() {
    const dispatch = useDispatch();
    const seasons = useSelector((state) => state.seasons.seasons);
    const loading = useSelector((state) => state.loading.SEASONSEARCH);

    useEffect(() => {
        dispatch(fetchSeasons());
    }, [dispatch]);
    return (
        <Card>
            <StyledAccordion elevation={0}>
                <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">Seasons Overview</Typography>
                </StyledAccordionSummary>
                <StyledAccordionDetails>
                    <Divider />

                    {loading ? (
                        <Progress />
                    ) : (
                        <TableContainer
                            component={Paper}
                            sx={{ backgroundColor: 'transparent' }}
                            elevation={0}
                        >
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Season</TableCell>
                                        <TableCell>Weeks</TableCell>
                                        <TableCell>Teams</TableCell>
                                        <TableCell align="center">
                                            1st
                                        </TableCell>
                                        <TableCell align="center">
                                            2nd
                                        </TableCell>
                                        <TableCell align="center">
                                            3rd
                                        </TableCell>
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
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {season.id}
                                            </TableCell>
                                            <TableCell>12</TableCell>
                                            <TableCell>
                                                {season.teams.length}
                                            </TableCell>
                                            <TableCell>
                                                {season.teams.map((team) =>
                                                    team.placement === 1 ? (
                                                        <TeamPreview
                                                            key={1}
                                                            team={team}
                                                        />
                                                    ) : (
                                                        ''
                                                    )
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {season.teams.map((team) =>
                                                    team.placement === 2 ? (
                                                        <TeamPreview
                                                            key={2}
                                                            team={team}
                                                        />
                                                    ) : (
                                                        ''
                                                    )
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {season.teams.map((team) =>
                                                    team.placement === 3 ? (
                                                        <TeamPreview
                                                            key={3}
                                                            team={team}
                                                        />
                                                    ) : (
                                                        ''
                                                    )
                                                )}
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

export default SeasonsOverview;
