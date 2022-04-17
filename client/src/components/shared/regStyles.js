import { styled } from '@mui/system';

export const HiddenInput = styled('input')({
    opacity: 0,
    width: '0.1px',
    height: '0.1px',
    position: 'absolute',
});

export const Label = styled('label')({});

export const FileInput = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    alignItems: 'center',
});
