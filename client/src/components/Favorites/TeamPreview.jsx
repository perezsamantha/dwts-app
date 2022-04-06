import { Box, Typography } from '@mui/material';
import React from 'react';

function TeamPreview(props) {
    const { team } = props;
    const { pro, celeb } = team;

    return (
        <Box>
            <Box
                component="img"
                sx={{ height: '100%', width: '100%', borderRadius: 2 }}
                src={team.cover_pic ? team.cover_pic : '/defaultPic.jpeg'}
            />
            <Typography variant="body1" align="left" noWrap>
                {celeb.first_name} & {pro.first_name}
            </Typography>
        </Box>
    );
}

export default TeamPreview;
