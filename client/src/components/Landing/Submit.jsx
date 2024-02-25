import React from 'react';
import { Typography, Stack, Box } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import { GoogleButton, Line, SubmitButton } from './styles';
import { motion } from 'framer-motion';
import { useGoogleLogin } from '@react-oauth/google';

function Submit(props) {
    const { type, handleSubmit, handleOAuth } = props;

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => handleOAuth(codeResponse),
        flow: 'auth-code',
    });

    return (
        <Stack width={1} spacing={2} alignItems="center">
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
                <GoogleButton onClick={() => login()} variant="contained">
                    <Stack direction="row" spacing={1} alignItems="center">
                        <FcGoogle style={{ width: 20, height: 20 }} />
                        <Typography>
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
        </Stack>
    );
}

export default Submit;
