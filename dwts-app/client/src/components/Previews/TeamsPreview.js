import { Typography } from '@mui/material';
import React from 'react';
import { convertPlacement } from '../shared/functions.js';
import { Preview, PreviewPhoto } from "../shared/shared.js";

function TeamsPreview(props) {
    const team = props.team;
    const pro = props.pro;
    const celeb = props.celeb;
    const placement = convertPlacement(team.placement);

    // notes:
    // average score?
    // only show season if organized by season?

    return (
        <Preview>
                <PreviewPhoto src={team.cover_pic ? team.cover_pic : "/defaultPic.jpeg"} />
                <Typography variant='h6'>{celeb.first_name} & {pro.first_name}</Typography>
                <Typography variant='caption'>Season {team.season_id} &#8226; {placement} Place</Typography>
            </Preview>
    )
    }

export default TeamsPreview;