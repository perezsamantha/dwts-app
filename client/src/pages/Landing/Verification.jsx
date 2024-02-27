import { Button, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { verifyUser } from '../../actions/auth';
import { ExtraContainer, ExtraPage } from '../../components/shared/muiStyles';
import Progress from '../../components/shared/Progress';

function Verification() {
    const { token } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loading = useSelector((state) => state.loading.AUTHVERIFY);
    const errorMsg = useSelector((state) => state.errors.AUTHVERIFY);
    const user = useSelector((state) => state.auth.authData);

    const handleSubmit = () => {
        dispatch(verifyUser(token, navigate));
    };

    return (
        <ExtraPage>
            <ExtraContainer elevation={4}>
                {errorMsg ? (
                    <Stack spacing={1}>
                        <Typography variant="h4">{errorMsg}</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                            <Link
                                to={{ pathname: `/` }}
                                style={{
                                    color: 'inherit',
                                }}
                            >
                                Return to home
                            </Link>
                        </Typography>
                    </Stack>
                ) : !loading && Object.keys(user).includes('id') ? (
                    <Stack spacing={1} alignItems="center">
                        <Progress />
                        <Typography variant="h4">Email Verified!</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                            You will be automatically redirected in 5 seconds...
                        </Typography>
                    </Stack>
                ) : loading ? (
                    <Stack spacing={1} alignItems="center">
                        <Progress />
                        <Typography>Verifying...</Typography>
                    </Stack>
                ) : (
                    <Stack spacing={2} alignItems="center">
                        <Typography variant="h4">Email Verification</Typography>
                        <Button
                            onClick={handleSubmit}
                            size="large"
                            variant="contained"
                            color="primary"
                        >
                            <Typography color="black">
                                Click to verify
                            </Typography>
                        </Button>
                    </Stack>
                )}
            </ExtraContainer>
        </ExtraPage>
    );
}

export default Verification;
