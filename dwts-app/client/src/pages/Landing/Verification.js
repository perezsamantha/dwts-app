import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { verifyUser } from '../../actions/auth';

function Verification() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    const loading = useSelector((state) => state.loading.AUTHVERIFY);
    const message = useSelector((state) => state.auth?.authData?.message);
    useEffect(() => {
        dispatch(verifyUser(id, navigate));
    }, [dispatch, id, navigate]);

    return (
        <Box>
            {loading ? (
                <Typography>Verifying Email...</Typography>
            ) : (
                <Typography>{message}</Typography>
            )}
        </Box>
    );
}

export default Verification;
