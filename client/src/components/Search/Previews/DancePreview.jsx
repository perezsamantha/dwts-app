import React from 'react';

import { Card, Stack, Typography } from '@mui/material';
import { getTotalScore, organizeDancers } from '../../shared/functions';
import { FiHeart } from 'react-icons/fi';
import { BsPersonCircle, BsStars, BsArrowRight } from 'react-icons/bs';
import { MdOutlineQueueMusic } from 'react-icons/md';

function DancePreview(props) {
    const { dance } = props;
    const { scores, episode } = dance;

    return (
        <Card elevation={3} sx={{ padding: 1, margin: 0 }}>
            <Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                    <BsStars />
                    <Typography>{dance.style}</Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                    <BsArrowRight />
                    <Typography variant="subtitle1">
                        Season {episode.season_id} &#8226; Week {episode.week}{' '}
                        {episode?.night && `\u2022 Night ${episode.night}`}{' '}
                        {scores?.length !== 0 &&
                            `\u2022 ${getTotalScore(scores)}`}
                    </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                    <MdOutlineQueueMusic />
                    <Typography noWrap>
                        {dance.song_title} - {dance.song_artist}
                    </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                    <BsPersonCircle />
                    <Typography noWrap>
                        {organizeDancers(dance.dancers).join(', ')}
                    </Typography>
                </Stack>

                {dance.likes.length > 0 && (
                    <Stack direction="row" spacing={1} alignItems="center">
                        <FiHeart />
                        <Typography>{dance.likes.length}</Typography>
                    </Stack>
                )}
            </Stack>
        </Card>
    );
}

export default DancePreview;
