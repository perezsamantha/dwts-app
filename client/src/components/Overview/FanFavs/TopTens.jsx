import { Card, Divider, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    StyledAccordion,
    StyledAccordionDetails,
    StyledAccordionSummary,
} from '../../shared/muiStyles';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchSeasons } from '../../../actions/seasons';

function TopTens() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSeasons());
    }, [dispatch]);
    return (
        <Card>
            <StyledAccordion elevation={0} defaultExpanded>
                <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">Fan Favorites</Typography>
                </StyledAccordionSummary>
                <StyledAccordionDetails>
                    <Divider />

                    <Typography variant="h6">Top 10 Pros</Typography>
                    <Typography variant="h6">Top 10 Teams</Typography>
                    <Typography variant="h6">Top 10 Dances</Typography>
                </StyledAccordionDetails>
            </StyledAccordion>
        </Card>
    );
}

export default TopTens;
