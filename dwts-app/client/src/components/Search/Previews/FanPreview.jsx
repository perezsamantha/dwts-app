import React from 'react';

import { Avatar, Box, Card, Paper, Stack, Typography } from '@mui/material';

function FanPreview(props) {
    const { fan } = props;

    return (
        <Card elevation={3} sx={{ padding: 1, margin: 0 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar src={fan.cover_pic} sx={{ width: 30, height: 30 }} />
                <Stack>
                    <Typography variant="subtitle1">
                        {fan?.nickname || '.'}
                    </Typography>
                    <Typography variant="subtitle2">@{fan.username}</Typography>
                </Stack>
            </Stack>
        </Card>
    );
}

export default FanPreview;
