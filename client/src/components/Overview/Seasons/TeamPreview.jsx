import { Avatar, Box, Stack, Typography } from '@mui/material';

function TeamPreview(props) {
    const { team } = props;
    const { celeb, pro } = team;
    return (
        <Box>
            <Stack alignItems="center">
                <Avatar
                    sx={{ height: 30, width: 30 }}
                    src={team.cover_pic}
                ></Avatar>
                <Typography sx={{ fontSize: 12 }}>
                    {celeb.first_name} &
                </Typography>
                <Typography sx={{ fontSize: 12 }}>{pro.first_name}</Typography>
            </Stack>
        </Box>
    );
}

export default TeamPreview;
