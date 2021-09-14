import React from 'react';
import { Preview, PreviewPhoto, Names, Details } from '../shared/shared.js';

function DancesPreview(props) {

    return (
        <Preview>
            <PreviewPhoto src={props.dance.coverPic} />
            <Names>{props.dance.teams.map((id, index) => (
                
                `${index !== 0 ? ', ' : ''}${props.teams.find((team) => team._id === id).celeb.split(" ")[0]} & ${props.teams.find((team) => team._id === id)?.pro.split(" ")[0]}` 
            ))}</Names>
            <Details>{props.dance.style} &bull; 29/30</Details>
        </Preview>
    )
}

export default DancesPreview;