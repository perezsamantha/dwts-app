import React from 'react';
import { convertPlacement } from '../shared/functions.js';
import { Preview, PreviewPhoto, Names, Details } from "../shared/shared.js";

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
                <Names>{celeb.first_name} & {pro.first_name}</Names>
                <Details>Season {team.season_id} &#8226; {placement} Place</Details>
            </Preview>
    )
}

export default TeamsPreview;