import styled from '@emotion/styled';
import { Button, Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();

    return (
        <NotFoundContainer>
            <PaperContainer elevation={4}>
                <Typography mb={1}>Page not found</Typography>
                <Button
                    variant="contained"
                    onClick={() => navigate('/dashboard')}
                >
                    Return Home
                </Button>
            </PaperContainer>
        </NotFoundContainer>
    );
}

const NotFoundContainer = styled(Container)`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const PaperContainer = styled(Paper)`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
`;

export default NotFound;
