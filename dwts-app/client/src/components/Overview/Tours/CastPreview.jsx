import { Avatar, Box, Stack, Typography } from '@mui/material';

function CastPreview() {
    return (
        <Box>
            <Stack alignItems="center">
                <Avatar sx={{ height: 30, width: 30 }}></Avatar>
                <Typography sx={{ fontSize: 12 }}>Name</Typography>
            </Stack>
        </Box>
    );
}

export default CastPreview;
