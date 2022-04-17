import { Stack, Typography } from '@mui/material';
import { ExtraContainer, ExtraPage } from '../components/shared/muiStyles';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <ExtraPage>
            <ExtraContainer elevation={4}>
                <Stack spacing={1}>
                    <Typography variant="h4">Page Not Found!</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        <Link
                            to={{ pathname: `/` }}
                            style={{
                                color: 'inherit',
                            }}
                        >
                            Return to sign in page
                        </Link>
                    </Typography>
                </Stack>
            </ExtraContainer>
        </ExtraPage>
    );
}

export default NotFound;
