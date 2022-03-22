import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { convertPlacement } from '../../shared/functions.js';

function TeamPreview(props) {
    const { team, sortType } = props;
    const placement = convertPlacement(team.placement);

    // notes:
    // average score?

    return (
        <Stack>
            <Box
                component="img"
                sx={{ height: '100%', width: '100%', borderRadius: 2 }}
                src={team.cover_pic ? team.cover_pic : '/defaultPic.jpeg'}
            />
            <Typography variant="subtitle1" noWrap>
                {team.celeb.first_name} & {team.pro.first_name}
            </Typography>

            {sortType === 'season' && (
                <Typography variant="caption" noWrap>
                    {placement} Place &#8226; Avg Score -
                </Typography>
            )}
            {sortType === 'placement' && (
                <Typography variant="caption" noWrap>
                    Season {team.season_id} &#8226; Avg Score -
                </Typography>
            )}
        </Stack>
    );
}

export default TeamPreview;
