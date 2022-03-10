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
} from '../../Dashboard/sharedStyles';
import { useSelector } from 'react-redux';

function SeasonsOverview() {
    const seasons = useSelector((state) => state.seasons.seasons);

    return (
        <Card elevation={3}>
            <StyledAccordion elevation={0}>
                <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">Seasons Overview</Typography>
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
                                    <TableCell>Weeks</TableCell>
                                    <TableCell>Teams</TableCell>
                                    <TableCell align="center">1st</TableCell>
                                    <TableCell align="center">2nd</TableCell>
                                    <TableCell align="center">3rd</TableCell>
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
                                        <TableCell>12</TableCell>
                                        <TableCell>
                                            {season.teams.length}
                                        </TableCell>
                                        <TableCell>
                                            {season.teams.map((team) =>
                                                team.placement === 1 ? (
                                                    <TeamPreview team={team} />
                                                ) : (
                                                    ''
                                                )
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {season.teams.map((team) =>
                                                team.placement === 2 ? (
                                                    <TeamPreview team={team} />
                                                ) : (
                                                    ''
                                                )
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {season.teams.map((team) =>
                                                team.placement === 3 ? (
                                                    <TeamPreview team={team} />
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
                </StyledAccordionDetails>
            </StyledAccordion>
        </Card>
    );
}

export default SeasonsOverview;
