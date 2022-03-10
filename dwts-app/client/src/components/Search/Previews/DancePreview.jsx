import React from 'react';

import { Card, Stack, Typography } from '@mui/material';
import { getSeasonAndWeek } from '../../shared/functions';
import { useSelector } from 'react-redux';

function DancePreview(props) {
    const { dance } = props;
    const episodes = useSelector((state) => state.episodes.episodes);

    return (
        <Card elevation={3} sx={{ padding: 1, margin: 0 }}>
            <Stack>
                <Typography>{dance.style}</Typography>
                <Typography>{getSeasonAndWeek(dance, episodes)}</Typography>
                <Typography noWrap>
                    {dance.song_title} - {dance.song_artist}
                </Typography>
            </Stack>
        </Card>
    );
}

export default DancePreview;
