import { Box, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { Preview, PreviewPhoto } from '../shared/regStyles';

function ProPreview(props) {
    const pro = props.pro;

    return (
        // <Paper elevation={2}>
        <Stack alignContent="left">
            <Box
                component="img"
                sx={{ height: '100%', width: '100%', borderRadius: 2 }}
                src={pro.cover_pic ? pro.cover_pic : '/defaultPic.jpeg'}
            />
            <Typography mt={1} variant="body1">
                {pro.first_name}
            </Typography>
        </Stack>
        // </Paper>
    );
}

export default ProPreview;
