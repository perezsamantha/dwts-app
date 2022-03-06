import { Typography } from '@mui/material';
import React from 'react';
import DataGetter from '../shared/DataGetter.js';
import { convertPlacement } from '../shared/functions.js';
import { Preview, PreviewPhoto } from '../shared/regStyles.js';

function TeamsPreview(props) {
    const team = props.team;
    const placement = convertPlacement(team.placement);

    // notes:
    // average score?
    // only show season if organized by season?

    return (
        <Preview>
            <PreviewPhoto
                src={team.cover_pic ? team.cover_pic : '/defaultPic.jpeg'}
            />
            <Typography variant="h6">
                <DataGetter id={team.id} type={'Team'} />
            </Typography>
            <Typography variant="caption">
                Season {team.season_id} &#8226; {placement} Place
            </Typography>
        </Preview>
    );
}

export default TeamsPreview;
