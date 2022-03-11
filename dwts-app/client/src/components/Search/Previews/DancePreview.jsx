import React from 'react';

import { Card, Stack, Typography } from '@mui/material';
import { getTotalScore } from '../../shared/functions';

function DancePreview(props) {
    const { dance } = props;
    const { scores, episode } = dance;

    const totalScore = getTotalScore(scores);

    return (
        <Card elevation={3} sx={{ padding: 1, margin: 0 }}>
            <Stack>
                <Typography>{dance.style}</Typography>
                <Typography>
                    Season {episode.season_id} &#8226; Week {episode.week}{' '}
                    &#8226; {totalScore}
                </Typography>
                <Typography noWrap>
                    {dance.song_title} - {dance.song_artist}
                </Typography>
            </Stack>
        </Card>
    );
}

export default DancePreview;
