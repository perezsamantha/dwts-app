import styled from '@emotion/styled';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card,
    Paper,
} from '@mui/material';

// export const CardContainer = styled(Card)(({ theme }) => ({
//     padding: 15,
//     marginTop: 15,
//     marginBottom: 15,
// }));

// eventually move to muiStyles in shared folder

export const StyledAccordion = styled(Accordion)(({ theme }) => ({
    backgroundColor: 'transparent',
}));

export const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
    padding: 0,
    minHeight: 'fit-content',
    maxHeight: 'fit-content',
    '& .MuiAccordionSummary-content': {
        margin: 0,
    },
    '&.Mui-expanded': {
        minHeight: 'fit-content',
        maxHeight: 'fit-content',
        '& .MuiAccordionSummary-content': {
            margin: 0,
        },
    },
}));

export const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
    padding: 0,
}));
