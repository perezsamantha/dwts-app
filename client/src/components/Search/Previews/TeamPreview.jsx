import { Stack, Typography } from '@mui/material';
import React from 'react';
import { convertPlacement, getAverageScore } from '../../shared/functions.js';
import { PicturePreview } from '../../shared/muiStyles.js';

function TeamPreview(props) {
    const { team, sortType } = props;
    const placement = convertPlacement(team.placement);

    return (
        <Stack>
            <PicturePreview
                component="img"
                src={team.cover_pic ? team.cover_pic : '/defaultPic.jpeg'}
            />
            <Typography variant="subtitle1" noWrap mt={0.25}>
                {team.celeb.first_name} & {team.pro.first_name}
            </Typography>

            {sortType === 'season' && (
                <Stack>
                    <Typography variant="body2" noWrap>
                        {placement
                            ? `${placement} Place`
                            : `Currently Competing`}
                    </Typography>
                    <Typography variant="caption" noWrap>
                        {getAverageScore(team.dances, team.season_id)} Avg Score{' '}
                        {team.likes.length === 0
                            ? ''
                            : team.likes.length === 1
                            ? `\u2022 1 like`
                            : `\u2022 ${team.likes.length} likes`}
                    </Typography>
                </Stack>
            )}
            {sortType === 'placement' && (
                <Stack>
                    <Typography variant="body2" noWrap>
                        {team.season_id === 27.5
                            ? `Juniors`
                            : `Season ${team.season_id}`}
                    </Typography>
                    <Typography variant="caption" noWrap>
                        {getAverageScore(team.dances)} Avg Score{' '}
                        {team.likes.length === 0
                            ? ''
                            : team.likes.length === 1
                            ? `\u2022 1 like`
                            : `\u2022 ${team.likes.length} likes`}
                    </Typography>
                </Stack>
            )}
        </Stack>
    );
}

export default TeamPreview;
