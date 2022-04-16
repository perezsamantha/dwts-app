import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';

export const StyledTextField = styled(TextField)({
    '& > *': {
        marginLeft: 0,
        marginRight: 0,
    },
});

export const SubmitButton = styled(Button)(({ theme }) => ({
    width: '100%',
    padding: 8,
    textTransform: 'none',
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        boxShadow:
            theme.palette.mode === 'light'
                ? '0px 0px 15px 2px rgba(150, 150, 150, 0.2)'
                : 'none',
    },
    boxShadow:
        theme.palette.mode === 'light'
            ? '0px 0px 15px 2px rgba(150, 150, 150, 0.2)'
            : 'none',
}));

export const GoogleButton = styled(Button)(({ theme }) => ({
    width: '100%',
    padding: 8,
    textTransform: 'none',
    '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        boxShadow:
            theme.palette.mode === 'light'
                ? '0px 0px 15px 2px rgba(150, 150, 150, 0.2)'
                : 'none',
    },
    boxShadow:
        theme.palette.mode === 'light'
            ? '0px 0px 15px 2px rgba(150, 150, 150, 0.2)'
            : 'none',
}));

export const Line = styled('hr')({
    width: '100%',
    opacity: '35%',
    borderWidth: 0.5,
});
