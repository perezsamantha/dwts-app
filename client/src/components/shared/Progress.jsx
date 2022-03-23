import { Box, CircularProgress } from '@mui/material';

function Progress() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
            <CircularProgress />
        </Box>
    );
}

export default Progress;
