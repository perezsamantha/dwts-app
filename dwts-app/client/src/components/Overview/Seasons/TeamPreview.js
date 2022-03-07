import { Avatar, Box, Stack, Typography } from '@mui/material';

function TeamPreview() {
    return (
        <Box>
            <Stack alignItems="center">
                <Avatar></Avatar>
                <Typography>Celeb &</Typography>
                <Typography>Pro</Typography>
            </Stack>
        </Box>
    );
}

export default TeamPreview;
