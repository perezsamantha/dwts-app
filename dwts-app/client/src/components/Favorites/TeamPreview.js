import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

function TeamPreview(props) {
    const { team } = props;
    const { pro, celeb } = team;

    return (
        <Stack alignContent="left">
            <Box
                component="img"
                sx={{ height: '100%', width: '100%', borderRadius: 2 }}
                src={team.cover_pic ? team.cover_pic : '/defaultPic.jpeg'}
            />
            <Typography mt={1} variant="body1">
                {celeb.first_name} &
            </Typography>
            <Typography variant="body1">{pro.first_name}</Typography>
            {/* <Typography variant="body1">
                {getTeamName} just first names with &
            </Typography> */}
        </Stack>
    );
}

export default TeamPreview;
