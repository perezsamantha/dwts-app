import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams } from '../../actions/teams.js';
//import styled from 'styled-components';
import { Preview, PreviewPhoto, Names, Details } from '../shared/shared.js';

function DancesPreview(props) {

    const dispatch = useDispatch();
    const teams = useSelector(state => state.teams.teams);

    useEffect(() => {
        dispatch(fetchTeams());
    }, [dispatch])

    

    return (
        <Preview>
            <PreviewPhoto src={props.dance.coverPic} />
            <Names>{props.dance.teams.map((id, index) => (
                
                `${index !== 0 ? ', ' : ''}${teams.find((team) => team._id === id).celeb.split(" ")[0]} & ${teams.find((team) => team._id === id).pro.split(" ")[0]}` 
            ))}</Names>
            <Details>{props.dance.style} &bull; 29/30</Details>
        </Preview>
    )
}

export default DancesPreview;