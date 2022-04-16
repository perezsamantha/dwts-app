import React from 'react';
import GoogleLogin from 'react-google-login';
import { Typography, Stack, Box } from '@mui/material';
import { SiGoogle } from 'react-icons/si';
import { GoogleButton, Line, SubmitButton } from './common';
import { motion } from 'framer-motion';

function Submit(props) {
    const { type, handleSubmit, handleOAuth } = props;

    return (
        <Stack width={1} spacing={3} alignItems="center">
            <Box
                component={motion.div}
                whileHover={{
                    scale: 1.025,
                    transition: { duration: 0.3 },
                }}
                whileTap={{
                    scale: 1.03,
                    transition: { duration: 0.3 },
                }}
                width={1}
            >
                <SubmitButton
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    <Typography>
                        Sign{' '}
                        {type === 'signin'
                            ? 'In'
                            : type === 'signup'
                            ? 'Up'
                            : ''}
                    </Typography>
                </SubmitButton>
            </Box>

            <Stack width={0.95} direction="row" spacing={1} alignItems="center">
                <Line />
                <Typography>OR</Typography>
                <Line />
            </Stack>

            <GoogleLogin
                clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
                render={(renderProps) => (
                    <Box
                        component={motion.div}
                        whileHover={{
                            scale: 1.025,
                            transition: { duration: 0.3 },
                        }}
                        whileTap={{
                            scale: 1.03,
                            transition: { duration: 0.3 },
                        }}
                        width={1}
                    >
                        <GoogleButton
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            variant="contained"
                            color="secondary"
                        >
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >
                                <SiGoogle style={{ width: 20, height: 20 }} />
                                <Typography color="inherit">
                                    Sign{' '}
                                    {type === 'signin'
                                        ? 'in'
                                        : type === 'signup'
                                        ? 'up'
                                        : ''}{' '}
                                    with Google
                                </Typography>
                            </Stack>
                        </GoogleButton>
                    </Box>
                )}
                onSuccess={handleOAuth}
                onFailure={handleOAuth}
                cookiePolicy="single_host_origin"
            />
        </Stack>
    );
}

export default Submit;
