import React, { useContext, useState } from 'react';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// import GoogleLogin from 'react-google-login';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../actions/auth';

import { SubmitButton } from './common';
import { AccountContext } from './AccountContext';
import {
    Box,
    Typography,
    IconButton,
    InputAdornment,
    TextField,
    Stack,
} from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const initialState = {
    username: '',
    email: '',
    password: '',
    confirm_password: '',
};

function SignUp() {
    const [showPass, setShowPass] = useState(false);

    const [formData, setFormData] = useState(initialState);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const message = useSelector((state) => state.auth?.authData?.message);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(signUp(formData, navigate));
    };

    const handleShowPass = () => setShowPass((prevShowPass) => !prevShowPass);

    // const googleSuccess = async (res) => {
    //     const result = res?.profileObj;
    //     const token = res?.tokenId;

    //     try {
    //         dispatch({ type: 'AUTH', data: { result, token } });

    //         // history.push("/")
    //         // around 1:10:00 in vid, has logout right after
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const googleFailure = () => {
    //     console.log('Google Sign In was unsuccessful');
    // }

    const { switchToSignin } = useContext(AccountContext);

    return (
        <Box>
            <Box component="form" noValidate autoComplete="off">
                <div>
                    <TextField
                        fullWidth
                        name="username"
                        type="text"
                        onChange={handleChange}
                        margin="dense"
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
                        id="email"
                        name="email"
                        placeholder="email"
                        type="email"
                        onChange={handleChange}
                        margin="dense"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon />
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
                        margin="dense"
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
                    <TextField
                        fullWidth
                        autoComplete="off"
                        id="confirmPass"
                        name="confirm_password"
                        placeholder="confirm password"
                        type="password"
                        onChange={handleChange}
                        margin="dense"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
            </Box>

            {message && <Typography>{message}</Typography>}

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                //width={0.9}
                my={2}
            >
                <Typography
                    variant="h4"
                    color="primary"
                    sx={{ fontWeight: 500 }}
                >
                    Sign Up
                </Typography>
                <SubmitButton type="submit" onClick={handleSubmit}>
                    <ArrowRightAltIcon
                        sx={{
                            width: 0.8,
                            height: 0.8,
                            color: 'rgba(255, 255, 255, 0.9)',
                            textShadow: '150px 250px 100px green',
                        }}
                    />
                </SubmitButton>
            </Stack>
        </Box>
        /*
        <form autoComplete="off" onSubmit={handleSubmit}>
                <TextField required id="standard-basic" name="email" label="email" type="email" onChange={handleChange}/>
                <TextField required id="standard-password-input" name="password" label="password" type={showPass ? "text" : "password"} onChange={handleChange} handleShowPass={handleShowPass} />
                <Button type="submit" variant="contained" color="primary">sign in</Button>

                <GoogleLogin
                    clientId="728282315077-4l2arbte54183f2cmgiopkdh51o797cm.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                            <FontAwesomeIcon icon={faGoogle} />
                        </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />
            </form>
            */
    );
}

export default SignUp;
