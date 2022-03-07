import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import DataGetter from '../shared/DataGetter.js';
import { convertPlacement } from '../shared/functions.js';

function TeamsPreview(props) {
    const team = props.team;
    const placement = convertPlacement(team.placement);

    // notes:
    // average score?
    // only show season if organized by season?

    return (
        <Stack>
            <Box
                component="img"
                sx={{ height: '100%', width: '100%', borderRadius: 2 }}
                src={team.cover_pic ? team.cover_pic : '/defaultPic.jpeg'}
            />
            <Typography variant="subtitle1" noWrap>
                <DataGetter id={team.id} type={'Team'} />
            </Typography>
            <Typography variant="caption" noWrap>
                Season {team.season_id} &#8226; {placement} Place
            </Typography>
        </Stack>
    );
}

export default TeamsPreview;
