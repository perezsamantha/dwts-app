import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { googleAuth, signUp } from '../../actions/auth';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { StyledTextField } from './styles';
import {
    Box,
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
import Submit from './Submit';
import useWindowDimensions from '../shared/useWindowDimensions';

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

    const loading = useSelector((state) => state.loading.AUTH);
    const authMsg = useSelector((state) => state.auth?.authData?.message);
    const errorMsg = useSelector((state) => state.errors.AUTH);
    const [token, setToken] = useState(null);
    const [creating, setCreating] = useState(false);
    const [pageSwitch, setPageSwitch] = useState(true);

    const { height } = useWindowDimensions();

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
        <Stack width={1} alignItems="center">
            {errorMsg &&
                errorMsg !== 'OAuth user' &&
                errorMsg !== 'OAuth username' &&
                !pageSwitch &&
                !loading && (
                    <Box width={1}>
                        <Alert severity="error">{errorMsg}</Alert>
                    </Box>
                )}
            {authMsg && !errorMsg && !pageSwitch && !loading && (
                <Box width={1}>
                    <Alert severity="info">{authMsg}</Alert>
                </Box>
            )}
            <Box component="form" noValidate autoComplete="off" mb={1}>
                <StyledTextField
                    fullWidth
                    name="username"
                    type="text"
                    size={height < 730 ? 'small' : 'normal'}
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
                    name="email"
                    placeholder="email"
                    type="email"
                    size={height < 730 ? 'small' : 'normal'}
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
                    size={height < 730 ? 'small' : 'normal'}
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
                    name="confirm_password"
                    placeholder="confirm password"
                    type="password"
                    size={height < 730 ? 'small' : 'normal'}
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

            <Submit
                type="signup"
                handleSubmit={handleSubmit}
                handleOAuth={handleOAuth}
            />

            <Box>
                <Dialog open={creating} onClose={handleClose}>
                    <DialogTitle>Choose Username</DialogTitle>
                    <DialogContent>
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
                                    handleOAuthNew(e);
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
