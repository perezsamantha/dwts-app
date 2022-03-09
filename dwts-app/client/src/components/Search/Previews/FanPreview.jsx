import React from 'react';

import { Avatar, Paper, Stack, Typography } from '@mui/material';

function FanPreview(props) {
    const { fan } = props;

    return (
        <Paper elevation={3} sx={{ padding: '0.5rem 1rem' }}>
            <Stack direction="row" alignItems="center" my={1}>
                <Avatar
                    src={fan.cover_pic}
                    sx={{ width: 50, height: 50, marginRight: 1 }}
                />
                {/* TODO: make same size ? */}
                <Stack>
                    <Typography variant="subtitle1">
                        {fan.nickname || '.'}
                    </Typography>
                    <Typography>@{fan.username}</Typography>
                </Stack>
            </Stack>
        </Paper>
    );
}

export default FanPreview;
