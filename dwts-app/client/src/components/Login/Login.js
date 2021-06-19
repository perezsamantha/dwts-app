import React, { useState } from 'react';
import './Login.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import GoogleLogin from 'react-google-login';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import { useDispatch } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: '15ch',
            width: '15ch',
        },
    },
}));

function Login({ setToken }) {
    const classes = useStyles();

    const [showPass, setShowPass] = useState(false);

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const dispatch = useDispatch();

    const handleChange = () => {

    }

    const handleSubmit = () => {

    }

    const handleShowPass = () => setShowPass((prevShowPass) => !prevShowPass);

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } });
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = () => {
        console.log(error);
        console.log('Google Sign In was unsuccessful');
    }

    return (
        <div>
            <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
                <TextField required id="standard-basic" label="email" type="email" />
                <TextField required id="standard-password-input" label="password" type={showPass ? "text" : "password"} handleShowPass={handleShowPass} />
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

        </div>
    )
}



export default Login;
