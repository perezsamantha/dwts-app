import { Box, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { Preview, PreviewPhoto } from '../shared/regStyles';

function ProPreview(props) {
    const pro = props.pro;

    return (
        <Paper elevation={2} sx={{ width: 75, height: 125 }}>
            <Stack alignContent="left">
                <Box
                    component="img"
                    sx={{ height: 70, width: 70 }}
                    src={pro.cover_pic ? pro.cover_pic : '/defaultPic.jpeg'}
                />
                <Typography variant="body1">{pro.first_name}</Typography>
            </Stack>
        </Paper>
    );
}

export default ProPreview;
