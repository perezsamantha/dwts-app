import React from 'react';
import { Box, Typography } from '@mui/material';

function ProPreview(props) {
    const { pro } = props;

    return (
        <Box>
            <Box
                component="img"
                sx={{ height: '100%', width: '100%', borderRadius: 2 }}
                src={pro.cover_pic ? pro.cover_pic : '/defaultPic.jpeg'}
            />
            <Typography variant="body1" align="left" noWrap>
                {pro.first_name} {pro.last_name}
            </Typography>
        </Box>
    );
}

export default ProPreview;
