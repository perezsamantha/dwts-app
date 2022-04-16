import { Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
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

    useEffect(() => {
        dispatch(verifyUser(token, navigate));
    }, [dispatch, token, navigate]);

    return (
        <ExtraPage>
            <ExtraContainer elevation={4}>
                {errorMsg ? (
                    <Stack>
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
                ) : !loading ? (
                    <Stack spacing={1} alignItems="center">
                        <Progress />
                        <Typography variant="h4">Email Verified!</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                            You will be automatically redirected in 5 seconds...
                        </Typography>
                    </Stack>
                ) : (
                    <></>
                )}
            </ExtraContainer>
        </ExtraPage>
    );
}

export default Verification;
