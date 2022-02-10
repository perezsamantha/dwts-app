import React from 'react';
import styled from 'styled-components';
import { Preview, PreviewPhoto, Names, Details } from "../shared/shared.js";

function TeamsPreview(props) {
    const team = props.team;
    const pro = props.pro;
    const celeb = props.celeb;

    return (
        <Preview>
                <PreviewPhoto src={team.cover_pic ? team.cover_pic : "/defaultPic.jpeg"} />
                <Names>{celeb.first_name} & {pro.first_name}</Names>
                <Details>Season {team.season_id} &#8226; {team.placement}</Details>
            </Preview>
    )
}

const SmallPhoto = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 10px;
`;

const SmallText = styled.h3`
    font-size: 10px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.7);
    margin: 1px;
    padding: 0 5px;
    letter-spacing: 0.05em;
    color: white;
`;

export default TeamsPreview;