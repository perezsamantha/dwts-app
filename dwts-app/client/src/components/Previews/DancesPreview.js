import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Preview, PreviewPhoto, Names, Details } from '../shared/shared.js';

import { Typography } from '@mui/material';

function DancesPreview(props) {
    const dance = props.dance;
    //const lightMode = localStorage.getItem('lightMode');
    //console.log(lightMode)

    useEffect(() => {
        const lightMode = localStorage.getItem('lightMode');
    }, [])

    return (
        <Preview>
            {/* <PreviewPhoto src={dance.cover_pic ? dance.cover_pic : "/defaultPic.jpeg"} /> */}
            
            {/* <Typography variant='h2'>Testing</Typography> */}
            <Details lightMode>{dance.style} &bull; {dance.song_title} &bull; {dance.song_artist}</Details>
        </Preview>
    )
}

export default DancesPreview;