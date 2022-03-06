import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

function TeamPreview(props) {
    const team = props.team;

    return (
        <Stack alignContent="left">
            <Box
                component="img"
                sx={{ height: '100%', width: '100%', borderRadius: 2 }}
                src={team.cover_pic ? team.cover_pic : '/defaultPic.jpeg'}
            />
            <Typography mt={1} variant="body1">
                {team.first_name} &
            </Typography>
            <Typography variant="body1">{team.last_name}</Typography>
            {/* <Typography variant="body1">
                {getTeamName} just first names with &
            </Typography> */}
        </Stack>
    );
}

export default TeamPreview;
