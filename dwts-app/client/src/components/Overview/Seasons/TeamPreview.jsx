import { Avatar, Box, Stack, Typography } from '@mui/material';

function TeamPreview() {
    return (
        <Box>
            <Stack alignItems="center">
                <Avatar sx={{ height: 30, width: 30 }}></Avatar>
                <Typography sx={{ fontSize: 12 }}>Celeb &</Typography>
                <Typography sx={{ fontSize: 12 }}>Pro</Typography>
            </Stack>
        </Box>
    );
}

export default TeamPreview;
