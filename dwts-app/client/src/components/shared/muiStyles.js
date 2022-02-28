//import styled from 'styled-components';
import styled from '@emotion/styled';
import { Chip, Paper, TextField } from '@mui/material';

export const ChipsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const IndividualChip = styled(Chip)`
    margin-right: 2px;
`;

export const Page = styled(Paper)`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// search

export const Container = styled(Paper)`
    width: 100%;
    //min-height: 300px;
    display: flex;
    flex-direction: column;
    position: relative;
    padding-bottom: 70px;
`;

export const ContentContainer = styled(Paper)`
    width: 90%;
    margin: 15px auto;
`;

export const SearchTextField = styled(TextField)(({ theme }) => ({
    width: '90%',
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
