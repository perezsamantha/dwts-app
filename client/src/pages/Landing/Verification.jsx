import { Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { verifyUser } from '../../actions/auth';
import { ExtraContainer, ExtraPage } from '../../components/shared/muiStyles';
import Progress from '../../components/shared/Progress';

function Verification() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    const loading = useSelector((state) => state.loading.AUTHVERIFY);
    const error = useSelector((state) => state.errors.AUTHVERIFY);

    useEffect(() => {
        dispatch(verifyUser(id, navigate));
    }, [dispatch, id, navigate]);

    return (
        <ExtraPage>
            <ExtraContainer elevation={4}>
                {error ? (
                    <Typography>{error}</Typography>
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
