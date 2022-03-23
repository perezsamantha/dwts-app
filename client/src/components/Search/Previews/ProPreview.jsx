import { Box, Typography } from '@mui/material';
import React from 'react';

function ProPreview(props) {
    const pro = props.pro;

    return (
        <Box>
            <Box
                component="img"
                sx={{ height: '100%', width: '100%', borderRadius: 2 }}
                src={pro.cover_pic ? pro.cover_pic : '/defaultPic.jpeg'}
            />
            <Typography variant="subtitle1" noWrap>
                {pro.first_name} {pro.last_name}
            </Typography>
            {/* <Typography variant="subtitle2">{pro.last_name}</Typography> */}
            {/* <Typography variant="body2">2 🏆</Typography>
            <Typography variant="caption">5.7 Avg Place</Typography> */}
        </Box>
    );
}

export default ProPreview;
