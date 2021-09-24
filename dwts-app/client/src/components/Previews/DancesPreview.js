import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPros } from '../../actions/pros.js';
import { Preview, PreviewPhoto, Names, Details } from '../shared/shared.js';
import { createLoadingSelector } from '../../api/selectors';

import * as actionType from '../../constants/actionTypes';

function DancesPreview(props) {
    const dispatch = useDispatch();
    const pros = useSelector(state => state.pros.pros);
    const loadingSelector = createLoadingSelector([actionType.PROSEARCH]);
    const isFetching = useSelector((state) => loadingSelector(state));

    useEffect(() => {
        dispatch(fetchPros());
    }, [dispatch])

    return (
        isFetching ? <div>loading bar</div> : <Preview>
            <PreviewPhoto src={props.dance.coverPic ? props.dance.coverPic : "/defaultPic.jpeg"} />
            <Names>{props.dance.teams.map((id, index) => (
                
                `${index !== 0 ? ', ' : ''}${props.teams.find((team) => team._id === id).celeb.split(" ")[0]} & ${pros.find(pro => pro._id === props.teams.find((team) => team._id === id).pro).name.split(" ")[0]}` 
            ))}</Names>
            <Details>{props.dance.style} &bull; 29/30</Details>
        </Preview>
    )
}

export default DancesPreview;