import React, { useContext, useState } from 'react';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// import GoogleLogin from 'react-google-login';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../actions/auth';

import {
    BoxContainer,
    FormContainer,
    MutedLink,
    BoldLink,
    SubmitButton,
    FullTextField,
} from './common';
import { AccountContext } from './AccountContext';
import { IconButton, InputAdornment, TextField } from '@mui/material';

const initialState = {
    username: '',
    email: '',
    password: '',
    confirm_password: '',
};

function Signup() {
    const [showPass, setShowPass] = useState(false);

    const [formData, setFormData] = useState(initialState);

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        <BoxContainer>
            <FormContainer onSubmit={handleSubmit}>
                <FullTextField
                    required
                    id="username"
                    name="username"
                    label="username"
                    type="text"
                    onChange={handleChange}
                    margin="dense"
                />
                <FullTextField
                    required
                    id="email"
                    name="email"
                    label="email"
                    type="email"
                    onChange={handleChange}
                    margin="dense"
                />
                <FullTextField
                    required
                    id="pass"
                    name="password"
                    label="password"
                    type={showPass ? 'text' : 'password'}
                    onChange={handleChange}
                    handleShowPass={handleShowPass}
                    margin="dense"
                    InputProps={{
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
                <FullTextField
                    required
                    id="confirmPass"
                    name="confirm_password"
                    label="confirm password"
                    type="password"
                    onChange={handleChange}
                    margin="dense"
                />
                <SubmitButton type="submit">Sign Up</SubmitButton>
                <MutedLink href="#">
                    Already have an account?{' '}
                    <BoldLink href="#" onClick={switchToSignin}>
                        Sign in.
                    </BoldLink>
                </MutedLink>
            </FormContainer>
        </BoxContainer>
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

export default Signup;
