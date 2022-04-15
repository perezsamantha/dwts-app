import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { googleAuth, signIn } from '../../actions/auth';

import {
    Typography,
    IconButton,
    InputAdornment,
    Stack,
    Box,
    TextField,
    Button,
    Alert,
} from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { SiGoogle } from 'react-icons/si';
import { Line, SubmitButton } from './common';

const initialState = { username: '', password: '' };

function SignIn() {
    const [showPass, setShowPass] = useState(false);

    const [formData, setFormData] = useState(initialState);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const errorMsg = useSelector((state) => state.errors.AUTH);
    const [pageSwitch, setPageSwitch] = useState(true);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(signIn(formData, navigate));
        setPageSwitch(false);
    };

    const handleOAuth = async (googleData) => {
        dispatch(googleAuth({ token: googleData.tokenId }, navigate));
        setPageSwitch(false);
    };

    const handleShowPass = () => setShowPass((prevShowPass) => !prevShowPass);

    return (
        <Stack width={1} alignItems="center" spacing={2}>
            {errorMsg && !pageSwitch && (
                <Box sx={{ width: 1 }}>
                    <Alert sx={{ borderRadius: 15 }} severity="error">
                        {errorMsg}
                    </Alert>
                </Box>
            )}
            <Box component="form" noValidate autoComplete="off">
                <TextField
                    fullWidth
                    name="username"
                    type="text"
                    onChange={handleChange}
                    placeholder="username"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AlternateEmailIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    fullWidth
                    autoComplete="off"
                    name="password"
                    placeholder="password"
                    type={showPass ? 'text' : 'password'}
                    onChange={handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleShowPass}>
                                    {showPass ? (
                                        <Visibility />
                                    ) : (
                                        <VisibilityOff />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSubmit(e);
                        }
                    }}
                />
                <Typography
                    align="left"
                    variant="body2"
                    mb={1}
                    sx={{ color: 'text.secondary' }}
                >
                    Forgot your password?
                </Typography>
            </Box>

            <Stack width={1} spacing={3} alignItems="center">
                <SubmitButton
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    <Typography>Sign In</Typography>
                </SubmitButton>

                <Stack
                    width={0.95}
                    direction="row"
                    spacing={1}
                    alignItems="center"
                >
                    <Line />
                    <Typography>OR</Typography>
                    <Line />
                </Stack>

                <GoogleLogin
                    clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
                    render={(renderProps) => (
                        <Button
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            variant="contained"
                            color="secondary"
                            sx={{
                                width: '100%',
                                padding: 1,
                                textTransform: 'none',
                            }}
                        >
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >
                                <SiGoogle style={{ width: 20, height: 20 }} />
                                <Typography color="inherit">
                                    Sign in with Google
                                </Typography>
                            </Stack>
                        </Button>
                    )}
                    onSuccess={handleOAuth}
                    onFailure={handleOAuth}
                    cookiePolicy="single_host_origin"
                />
            </Stack>
        </Stack>
    );
}

export default SignIn;
