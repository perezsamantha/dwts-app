import { Box, Card, Divider, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStatsData } from '../../../actions/multipleActions';
import { createLoadingSelector } from '../../../api/selectors';
import Progress from '../../shared/Progress';
import StatsTable from './StatsTable';
import {
    getPerfectsByPro,
    getPerfectsByTeam,
    getSeasonsAsPro,
    getWinsByPro,
} from './statsFunctions';
import * as actionType from '../../../constants/actionTypes';
import {
    StyledAccordion,
    StyledAccordionDetails,
    StyledAccordionSummary,
} from '../../shared/muiStyles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function StatisticsOverview() {
    const dispatch = useDispatch();
    const pros = useSelector((state) => state.pros.pros);
    const teams = useSelector((state) => state.teams.teams);

    const loadingSelector = createLoadingSelector([
        actionType.PROSEARCH,
        actionType.TEAMSEARCH,
        actionType.FETCHSTATSDATA,
    ]);
    const loading = useSelector((state) => loadingSelector(state));

    let perfectsByTeam, perfectsByPro, winsByPro, seasonsAsPro;

    useEffect(() => {
        dispatch(getStatsData());
    }, [dispatch]);

    if (!loading) {
        perfectsByTeam = getPerfectsByTeam(teams);
        perfectsByPro = getPerfectsByPro(pros);
        winsByPro = getWinsByPro(pros);
        seasonsAsPro = getSeasonsAsPro(pros);
    }

    return (
        <Card>
            <StyledAccordion elevation={0} defaultExpanded>
                <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">Statistics</Typography>
                </StyledAccordionSummary>
                <StyledAccordionDetails>
                    <Divider />

                    {loading ? (
                        <Progress />
                    ) : (
                        <Box>
                            <Typography variant="h6">
                                Perfect Scores by team
                            </Typography>
                            <StatsTable arr={perfectsByTeam} type="team" />

                            <Typography variant="h6">
                                Perfect Scores by pro
                            </Typography>
                            <StatsTable arr={perfectsByPro} type="pro" />

                            <Typography variant="h6">Wins by pro</Typography>
                            <StatsTable arr={winsByPro} type="pro" />

                            <Typography variant="h6">Seasons as pro</Typography>
                            <StatsTable arr={seasonsAsPro} type="pro" />
                        </Box>
                    )}
                </StyledAccordionDetails>
            </StyledAccordion>
        </Card>
    );
}

export default StatisticsOverview;
