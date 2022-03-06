import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

function DancePreview(props) {
    const dance = props.dance;
    // separate slider for dances????

    return (
        <Stack alignContent="left">
            {/* <Box
                component="img"
                sx={{ height: '100%', width: '100%', borderRadius: 2 }}
                src={dance.cover_pic ? dance.cover_pic : '/defaultPic.jpeg'}
            /> */}
            <Typography mt={1} variant="body1">
                {dance.username}
            </Typography>
            <Typography variant="body1">{dance.nickname}</Typography>
            {/* <Typography variant="body1">
                {getTeamName} just first names with &
            </Typography> */}
        </Stack>
    );
}

export default DancePreview;
