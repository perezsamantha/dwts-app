import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { BackButton, CoverPicture } from '../../shared/muiStyles';
import Likes from '../../shared/Likes';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function IndividualsHeader(props) {
    const { user, item, handleLike, type } = props;
    const navigate = useNavigate();

    return (
        <Stack direction="row" alignItems="center" spacing={3} mt={1}>
            <BackButton
                color="primary"
                sx={{
                    '&.MuiButtonBase-root:hover': {
                        bgcolor: 'transparent',
                    },
                }}
                component={motion.div}
                whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.3 },
                }}
                whileTap={{
                    scale: 1.25,
                    transition: { duration: 0.3 },
                }}
                onClick={() => navigate(-1)}
            >
                <ArrowBackIosIcon />
            </BackButton>
            {type === 'dance' ? (
                <Box
                    sx={{
                        width: 'fit-content',
                        height: 125,
                        display: 'flex',
                    }}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography
                        variant="h2"
                        fontFamily="Just Another Hand, Urbanist, Roboto, Helvetica Neue, sans-serif"
                        textTransform="uppercase"
                        marginTop={1.5}
                    >
                        {item.style}
                    </Typography>
                </Box>
            ) : (
                <CoverPicture
                    component="img"
                    src={item.cover_pic ? item.cover_pic : '/defaultPic.jpeg'}
                />
            )}
            {type === 'fan' ? (
                <Button disabled sx={{ opacity: 0 }}>
                    <ArrowBackIosIcon />
                </Button>
            ) : (
                <Box>
                    <Button
                        color="primary"
                        sx={{
                            '&.MuiButtonBase-root:hover': {
                                bgcolor: 'transparent',
                            },
                        }}
                        component={motion.div}
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.3 },
                        }}
                        whileTap={{
                            scale: 1.5,
                            transition: { duration: 0.3 },
                        }}
                        onClick={handleLike}
                    >
                        <Likes user={user} likes={item?.likes} />
                    </Button>
                    <Typography variant="subtitle1">
                        {item?.likes?.length}
                    </Typography>
                </Box>
            )}
        </Stack>
    );
}

export default IndividualsHeader;
