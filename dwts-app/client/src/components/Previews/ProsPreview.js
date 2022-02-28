import { Typography } from '@mui/material';
import React from 'react';
import { Preview, PreviewPhoto } from '../shared/shared';

function ProsPreview(props) {
    const pro = props.pro;

    return (
        <Preview>
            <PreviewPhoto
                src={pro.cover_pic ? pro.cover_pic : '/defaultPic.jpeg'}
            />
            <Typography variant="h6">
                {pro.first_name} {pro.last_name}
            </Typography>
        </Preview>
    );
}

export default ProsPreview;
