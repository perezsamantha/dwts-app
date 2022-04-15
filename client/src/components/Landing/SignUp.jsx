import React, { useState, useEffect } from 'react';
import GoogleLogin from 'react-google-login';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { googleAuth, signUp } from '../../actions/auth';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { GoogleButton, Line, StyledTextField, SubmitButton } from './common';
import {
    Box,
    Typography,
    IconButton,
    InputAdornment,
    Stack,
    Dialog,
    DialogTitle,
    Button,
    DialogActions,
    DialogContent,
    Alert,
} from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { SiGoogle } from 'react-icons/si';

const initialState = {
    username: null,
    email: null,
    password: null,
    confirm_password: null,
    oauth_username: null,
};

function SignUp() {
    const [showPass, setShowPass] = useState(false);

    const [formData, setFormData] = useState(initialState);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const authMsg = useSelector((state) => state.auth?.authData?.message);
    const errorMsg = useSelector((state) => state.errors.AUTH);
    const [token, setToken] = useState(null);
    const [creating, setCreating] = useState(false);
    const [pageSwitch, setPageSwitch] = useState(true);

    useEffect(() => {
        if (errorMsg === 'OAuth user') {
            setCreating(true);
        }
    }, [errorMsg]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(signUp(formData));
        setPageSwitch(false);
    };

    const handleOAuth = async (googleData) => {
        setFormData(initialState);
        setCreating(false);

        dispatch(
            googleAuth(
                { token: googleData.tokenId, username: null, signup: true },
                navigate
            )
        );
        setToken(googleData.tokenId);
        setPageSwitch(false);
    };

    const handleOAuthNew = (e) => {
        e.preventDefault();

        if (formData.oauth_username) {
            dispatch(
                googleAuth(
                    {
                        token: token,
                        username: formData.oauth_username,
                        signup: true,
                    },
                    navigate
                )
            );
            setPageSwitch(false);
        }
    };

    const handleClose = (e) => {
        setToken(null);
        setCreating(false);
    };

    const handleShowPass = () => setShowPass((prevShowPass) => !prevShowPass);

    return (
        <Stack width={1} alignItems="center" spacing={2}>
            {errorMsg &&
                errorMsg !== 'OAuth user' &&
                errorMsg !== 'OAuth username' &&
                !pageSwitch && (
                    <Box width={1}>
                        <Alert severity="error">{errorMsg}</Alert>
                    </Box>
                )}
            {authMsg && !errorMsg && (
                <Box width={1}>
                    <Alert severity="info">{authMsg}</Alert>
                </Box>
            )}
            <Box component="form" noValidate autoComplete="off">
                <StyledTextField
                    fullWidth
                    name="username"
                    type="text"
                    value={formData.username || ''}
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
                <StyledTextField
                    fullWidth
                    id="email"
                    name="email"
                    placeholder="email"
                    type="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <StyledTextField
                    fullWidth
                    autoComplete="off"
                    name="password"
                    placeholder="password"
                    type={showPass ? 'text' : 'password'}
                    value={formData.password || ''}
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
                />
                <StyledTextField
                    fullWidth
                    autoComplete="off"
                    id="confirmPass"
                    name="confirm_password"
                    placeholder="confirm password"
                    type="password"
                    value={formData.confirm_password || ''}
                    onChange={handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon />
                            </InputAdornment>
                        ),
                    }}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSubmit(e);
                        }
                    }}
                />
            </Box>

            <Stack width={1} spacing={3} alignItems="center">
                <SubmitButton
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    <Typography>Sign Up</Typography>
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
                                    Sign up with Google
                                </Typography>
                            </Stack>
                        </GoogleButton>
                    )}
                    onSuccess={handleOAuth}
                    onFailure={handleOAuth}
                    cookiePolicy="single_host_origin"
                />
            </Stack>

            <Box>
                <Dialog open={creating} onClose={handleClose}>
                    <DialogTitle>Choose Username</DialogTitle>
                    <DialogContent alignContent="center">
                        <StyledTextField
                            fullWidth
                            name="oauth_username"
                            type="text"
                            required
                            value={formData.oauth_username || ''}
                            onChange={handleChange}
                            placeholder="username"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AlternateEmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                            helperText={
                                errorMsg === 'OAuth username'
                                    ? 'Username already taken'
                                    : ''
                            }
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit(e);
                                }
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleOAuthNew}>Submit</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Stack>
    );
}

export default SignUp;
