import { Box, Typography } from '@mui/material';
import React from 'react';
import { PicturePreview } from '../shared/muiStyles';

function TeamPreview(props) {
    const { team } = props;
    const { pro, celeb } = team;

    return (
        <Box>
            <PicturePreview
                component="img"
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = '/defaultPic.png';
                }}
                src={team.cover_pic ? team.cover_pic : '/defaultPic.png'}
            />
            <Typography variant="body1" align="left" noWrap>
                {celeb.first_name} & {pro.first_name}
            </Typography>
        </Box>
    );
}

export default TeamPreview;
