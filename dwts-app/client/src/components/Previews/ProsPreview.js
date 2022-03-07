import { Box, Typography } from '@mui/material';
import React from 'react';
import { Preview, PreviewPhoto } from '../shared/regStyles';

function ProsPreview(props) {
    const pro = props.pro;

    return (
        <Box>
            <Box
                component="img"
                sx={{ height: 150, width: 150, borderRadius: 2 }}
                src={pro.cover_pic ? pro.cover_pic : '/defaultPic.jpeg'}
            />
            <Typography variant="h6">
                {pro.first_name} {pro.last_name}
            </Typography>
        </Box>
    );
}

export default ProsPreview;
