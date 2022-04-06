//import styled from 'styled-components';
import styled from '@emotion/styled';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Chip,
    TextField,
} from '@mui/material';

export const ChipsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const IndividualChip = styled(Chip)`
    margin-right: 2px;
`;

export const Page = styled(Box)(() => ({
    paddingBottom: 60,
}));

//main page container

export const MainContainer = styled(Box)`
    //height: 100vh;
    padding: 1rem;
    //margin: 1rem;
    /* display: flex;
    flex-direction: column;
    align-items: center; */
    //padding-bottom: 70px;
`;

// search results

export const ResultsContainer = styled(Box)`
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ContentContainer = styled(Box)({
    width: '100%',
});

export const SearchContainer = styled(Box)({
    width: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderBottom: '1px solid grey',
});

export const SearchBoxContainer = styled(Box)({
    width: '98%',
    margin: '10px auto',
    display: 'flex',
    flexDirection: 'row',
});

export const SearchTextField = styled(TextField)(({ theme }) => ({
    width: '100%',
    '& .MuiOutlinedInput-root': {
        background:
            theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'white',
        '&.Mui-focused': {
            color: theme.palette.mode === 'light' ? 'black' : 'black',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
        },
        '& .MuiSvgIcon-root': {
            color: theme.palette.mode === 'light' ? 'black' : 'black',
        },
    },
}));

// individuals

export const IndividualsContainer = styled(Box)`
    //width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    //overflow-y: auto;
    //overflow-x: auto;
    text-align: center;
`;

export const ExtraPic = styled(Box)(({ theme }) => ({
    width: 80,
    height: 80,
    borderRadius: 15,
    boxShadow:
        theme.palette.mode === 'light' ? '1px 5px 15px lightgrey' : 'none',
}));

// accordions

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
