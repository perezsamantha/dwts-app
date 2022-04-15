import React from 'react';
import { Box, Typography } from '@mui/material';
import { PicturePreview } from '../shared/muiStyles';

function ProPreview(props) {
    const { pro } = props;

    return (
        <Box>
            <PicturePreview
                component="img"
                src={pro.cover_pic ? pro.cover_pic : '/defaultPic.jpeg'}
            />
            <Typography variant="body1" align="left" noWrap>
                {pro.first_name} {pro.last_name}
            </Typography>
        </Box>
    );
}

export default ProPreview;
