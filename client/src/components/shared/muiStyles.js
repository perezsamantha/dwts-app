import { styled } from '@mui/system';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Chip,
    Container,
    Paper,
    Stack,
    TextField,
} from '@mui/material';

// main pages
export const Page = styled(Box)({
    paddingBottom: 70,
});

export const MainContainer = styled(Box)({
    padding: '1rem',
});

// search results

export const ResultsContainer = styled(Box)({
    padding: '1rem 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

export const ContentContainer = styled(Box)({
    width: '100%',
});

export const SearchContainer = styled(Box)({
    width: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

export const SearchBoxContainer = styled(Stack)({
    width: '100%',
});

export const SearchTextField = styled(TextField)(({ theme }) => ({
    width: '100%',
    '& .MuiOutlinedInput-root': {
        background:
            theme.palette.mode === 'light'
                ? 'rgba(0, 0, 0, 0.04)'
                : 'rgba(250, 250, 250, 0.1)',
        '& .MuiOutlinedInput-input': {
            color: theme.palette.mode === 'light' ? 'inherit' : 'white',
        },
        '&.Mui-focused': {
            color: theme.palette.mode === 'light' ? 'black' : 'black',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
        },
        '& .MuiSvgIcon-root': {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
        },
    },
}));

// account

export const AccountWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
});

export const AccountContainer = styled(Paper)({
    width: '95%',
    marginTop: 50,
    padding: 15,
    borderRadius: 25,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
});

// individuals

export const IndividualsContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
});

export const BackButton = styled(Button)({
    '&.MuiButtonBase-root:hover': {
        bgcolor: 'transparent',
    },
    height: 'fit-content',
});

export const CoverPicture = styled(Box)(({ theme }) => ({
    height: 175,
    width: 175,
    borderRadius: 10,
    margin: 10,
    boxShadow:
        theme.palette.mode === 'light' ? '1px 3px 5px lightgrey' : 'none',
}));

export const ExtraPic = styled(Box)(({ theme }) => ({
    width: 80,
    height: 80,
    borderRadius: 10,
    boxShadow:
        theme.palette.mode === 'light' ? '1px 3px 5px lightgrey' : 'none',
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

// extra pages

export const ExtraPage = styled(Container)({
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
});

export const ExtraContainer = styled(Paper)({
    minWidth: 300,
    padding: '1rem',
    textAlign: 'center',
    borderRadius: 15,
});

// role chip

export const RoleChip = styled(Chip)(({ theme }) => ({
    color: 'black',
    // backgroundColor:
    //     theme.palette.mode === 'light'
    //         ? theme.palette.primary.main
    //         : theme.palette.primary.light,
    backgroundColor: theme.palette.primary.main,
}));

// slider pictures

export const PicturePreview = styled(Box)(({ theme }) => ({
    height: '100%',
    width: '100%',
    borderRadius: 10,
    boxShadow:
        theme.palette.mode === 'light' ? '1px 3px 5px lightgrey' : 'none',
}));

export const LazyPicturePreview = styled('img')(({ theme }) => ({
    height: '100%',
    width: '100%',
    borderRadius: 10,
    boxShadow:
        theme.palette.mode === 'light' ? '1px 3px 5px lightgrey' : 'none',
}));
