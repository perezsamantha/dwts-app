import React from 'react';
import { Box, Typography } from '@mui/material';
import { PicturePreview } from '../../shared/muiStyles';
import LazyLoad from 'react-lazyload';

function ProPreview(props) {
    const { pro } = props;

    return (
        <Box>
            <LazyLoad height={100}>
                <PicturePreview
                    component="img"
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = '/defaultPic.png';
                    }}
                    src={pro.cover_pic ? pro.cover_pic : '/defaultPic.png'}
                />
            </LazyLoad>
            <Typography variant="subtitle1" noWrap>
                {pro.first_name} {pro.last_name}
            </Typography>
        </Box>
    );
}

export default ProPreview;
