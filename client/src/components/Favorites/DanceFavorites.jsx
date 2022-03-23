import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import DancePreview from './DancePreview';

function DanceFavorites(props) {
    const { dances } = props;

    return (
        <Stack>
            {dances.map((dance, index) => (
                <Link
                    key={index}
                    to={{ pathname: `/dances/${dance.id}` }}
                    style={{
                        textDecoration: 'inherit',
                        color: 'inherit',
                    }}
                >
                    <Typography>{dance.style}</Typography>
                </Link>
            ))}
        </Stack>
    );
}

export default DanceFavorites;
