import React from 'react';

import { Avatar, Card, Stack, Typography } from '@mui/material';
import LazyLoad from 'react-lazyload';

function FanPreview(props) {
    const { fan } = props;

    return (
        <Card sx={{ padding: 1, margin: 0 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
                <LazyLoad height={100}>
                    <Avatar
                        src={fan.cover_pic}
                        sx={{ width: 40, height: 40 }}
                    />
                </LazyLoad>
                <Stack>
                    <Typography variant="subtitle1">
                        {fan?.nickname || '.'}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        sx={{ color: 'text.secondary' }}
                    >
                        @{fan.username}
                    </Typography>
                </Stack>
            </Stack>
        </Card>
    );
}

export default FanPreview;
