import React from 'react';
import { Box, Typography } from '@mui/material';
import { LazyPicturePreview } from '../shared/muiStyles';

function ProPreview(props) {
    const { pro } = props;

    return (
        <Box>
            <LazyPicturePreview
                alt=""
                className="swiper-lazy"
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = '/defaultPic.png';
                }}
                data-src={pro.cover_pic ? pro.cover_pic : '/defaultPic.png'}
                src={'/defaultPic.png'}
            />
            <Typography variant="body1" align="left" noWrap>
                {pro.first_name} {pro.last_name}
            </Typography>
        </Box>
    );
}

export default ProPreview;
