import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    forgotPassword,
    googleAuth,
    resendVerification,
    signIn,
} from '../../actions/auth';
import EmailIcon from '@mui/icons-material/Email';
import {
    Typography,
    IconButton,
    InputAdornment,
    Stack,
    Dialog,
    DialogTitle,
    Button,
    DialogActions,
    DialogContent,
    Box,
    Alert,
    Link,
} from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { StyledTextField } from './common';
import Submit from './Submit';

const initialState = { username: null, password: null, email: null };

function SignIn() {
    const [showPass, setShowPass] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loading = useSelector((state) => state.loading.AUTH);
    const authMsg = useSelector((state) => state.auth?.authData?.message);
    const errorMsg = useSelector((state) => state.errors.AUTH);
    const [pageSwitch, setPageSwitch] = useState(true);
    const [openPass, setOpenPass] = useState(false);

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

    const handleResend = () => {
        dispatch(resendVerification(formData));
    };

    const handleOpenPass = () => {
        setOpenPass(true);
    };

    const handleClosePass = () => {
        setOpenPass(false);
    };

    const handleForgotPass = () => {
        if (formData.email) {
            dispatch(forgotPassword(formData));
            setOpenPass(false);
            setPageSwitch(false);
        }
    };

    const handleShowPass = () => setShowPass((prevShowPass) => !prevShowPass);

    return (
        <Stack width={1} alignItems="center" spacing={2}>
            {errorMsg && !pageSwitch && !loading && (
                <Box sx={{ width: 1 }}>
                    <Alert severity="error">
                        <Typography>{errorMsg}</Typography>
                        {errorMsg === 'Email not verified' && (
                            <Link
                                component="button"
                                variant="body1"
                                onClick={handleResend}
                                underline="always"
                                color="inherit"
                            >
                                Resend verification email
                            </Link>
                        )}
                    </Alert>
                </Box>
            )}

            {authMsg && !errorMsg && !pageSwitch && !loading && (
                <Box width={1}>
                    <Alert severity="info">{authMsg}</Alert>
                </Box>
            )}

            <Box component="form" noValidate autoComplete="off">
                <StyledTextField
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
                <StyledTextField
                    fullWidth
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
            </Box>

            <Box width={1}>
                <Link
                    align="left"
                    component="button"
                    variant="body2"
                    onClick={handleOpenPass}
                    underline="hover"
                    sx={{ color: 'text.secondary' }}
                >
                    Forgot password?
                </Link>
            </Box>

            <Submit
                type="signin"
                handleSubmit={handleSubmit}
                handleOAuth={handleOAuth}
            />

            <Box>
                <Dialog open={openPass} onClose={handleClosePass}>
                    <DialogTitle>Enter your email</DialogTitle>
                    <DialogContent>
                        <Box component="form" noValidate autoComplete="off">
                            <StyledTextField
                                fullWidth
                                name="email"
                                placeholder="email"
                                type="text"
                                value={formData.email || ''}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        handleForgotPass(e);
                                    }
                                }}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClosePass}>Cancel</Button>
                        <Button onClick={handleForgotPass}>Submit</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Stack>
    );
}

export default SignIn;
