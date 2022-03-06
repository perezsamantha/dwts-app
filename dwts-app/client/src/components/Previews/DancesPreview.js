import React, { useEffect } from 'react';
import { Preview } from '../shared/regStyles.js';

import { Typography } from '@mui/material';
import DataGetter from '../shared/DataGetter';

function DancesPreview(props) {
    const dance = props.dance;

    useEffect(() => {}, []);

    return (
        <Preview>
            {/* <PreviewPhoto src={dance.cover_pic ? dance.cover_pic : "/defaultPic.jpeg"} /> */}

            {/* <Typography variant='h2'>Testing</Typography> */}
            <Typography variant="body1">
                <DataGetter id={dance.episode_id} type={'Episode'} />{' '}
                {dance.style} &bull; {dance.song_title} - {dance.song_artist}
            </Typography>
        </Preview>
    );
}

export default DancesPreview;
