import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ExtraContainer, ExtraPage } from '../components/shared/muiStyles';

function NotFound() {
    const navigate = useNavigate();

    return (
        <ExtraPage>
            <ExtraContainer elevation={4}>
                <Typography mb={1}>Page not found</Typography>
                <Button
                    variant="contained"
                    onClick={() => navigate('/dashboard')}
                >
                    Return Home
                </Button>
            </ExtraContainer>
        </ExtraPage>
    );
}

export default NotFound;
