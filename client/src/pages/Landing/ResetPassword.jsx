import {
    Alert,
    Box,
    Button,
    IconButton,
    InputAdornment,
    Stack,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../actions/auth';
import { StyledTextField } from '../../components/Landing/common';
import { ExtraContainer, ExtraPage } from '../../components/shared/muiStyles';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const initialState = { password: null, confirm_password: null };

function ResetPassword() {
    const { token } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const authMsg = useSelector((state) => state.auth?.authData?.message);
    const errorMsg = useSelector((state) => state.errors.AUTH);

    const [formData, setFormData] = useState(initialState);
    const [showPass, setShowPass] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword(token, formData, navigate));
    };

    const handleShowPass = () => setShowPass((prevShowPass) => !prevShowPass);

    return (
        <ExtraPage>
            <ExtraContainer elevation={4}>
                {errorMsg !== 'Link has expired' ? (
                    <Stack spacing={1}>
                        <Typography variant="h4">Reset Password</Typography>
                        {errorMsg && (
                            <Box sx={{ width: 1 }}>
                                <Alert severity="error">
                                    <Typography align="left">
                                        {errorMsg}
                                    </Typography>
                                    <Typography>
                                        Return to sign in page{' '}
                                        <Link
                                            to={{ pathname: `/` }}
                                            style={{
                                                color: 'inherit',
                                            }}
                                        >
                                            here
                                        </Link>
                                    </Typography>
                                </Alert>
                            </Box>
                        )}
                        {authMsg && !errorMsg && (
                            <Box width={1}>
                                <Alert severity="success">
                                    <Typography align="left">
                                        {authMsg}!
                                    </Typography>
                                    <Typography align="left">
                                        You will be redirected to sign in page
                                        in 5 seconds...
                                    </Typography>
                                </Alert>
                            </Box>
                        )}

                        <Box component="form" noValidate autoComplete="off">
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
                                            <IconButton
                                                onClick={handleShowPass}
                                            >
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
                        <Button onClick={handleSubmit}>Submit</Button>
                    </Stack>
                ) : (
                    <Stack spacing={1}>
                        <Typography variant="h4">{errorMsg}</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                            Return to sign in page{' '}
                            <Link
                                to={{ pathname: `/` }}
                                style={{
                                    color: 'inherit',
                                }}
                            >
                                here
                            </Link>
                        </Typography>
                    </Stack>
                )}
            </ExtraContainer>
        </ExtraPage>
    );
}

export default ResetPassword;
