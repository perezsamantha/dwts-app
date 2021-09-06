import React, { useState, useContext } from 'react';

import TextField from '@material-ui/core/TextField';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// import GoogleLogin from 'react-google-login';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signin } from '../../actions/auth';

import { BoxContainer, FormContainer, MutedLink, BoldLink, SubmitButton } from './common';
import { AccountContext } from './AccountContext';
import { IconButton, InputAdornment } from '@material-ui/core';

const initialState = { username: '', password: '' }

function Signin(props) {

    const [showPass, setShowPass] = useState(false);

    const [formData, setFormData] = useState(initialState);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(signin(formData, history));
    }

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

    const { switchToSignup } = useContext(AccountContext);

    return (
        <BoxContainer>
            <FormContainer onSubmit={handleSubmit}>
                <TextField 
                    required 
                    id="username" 
                    name="username" 
                    label="username" 
                    type="text" 
                    onChange={handleChange} 
                    margin="dense"
                    //InputProps={{
                        //startAdornment: '@'
                    //}}
                />
                <TextField 
                    required 
                    id="pass" 
                    name="password" 
                    label="password" 
                    type={showPass ? "text" : "password"} 
                    onChange={handleChange} 
                    handleShowPass={handleShowPass} 
                    margin="dense"
                    InputProps={{
                        endAdornment:
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPass}>
                                {showPass ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }}
                />
                <MutedLink href="#">Forgot your password?</MutedLink>
                <SubmitButton type="submit">Sign In</SubmitButton>
                <MutedLink href="#">Don't have an account? <BoldLink href="#" onClick={switchToSignup}>Sign up.</BoldLink></MutedLink>
            </FormContainer>
        </BoxContainer>
        /* keep for when implementing google oauth
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

export default Signin;