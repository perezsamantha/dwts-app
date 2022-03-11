import { Box, Divider, Stack, Typography } from '@mui/material';
import DanceFavorites from './DanceFavorites';
import TeamFavorites from './TeamFavorites';
import ProFavorites from './ProFavorites';

function FavoritesWrapper(props) {
    const { likes } = props;

    if (typeof likes === 'undefined') {
        return <></>;
    }

    return (
        <Box sx={{ width: '100%' }} my={2}>
            <Stack width="fit-content" margin="auto">
                <Typography variant="h5">Favorites</Typography>
                <Divider />
            </Stack>

            {likes?.pros.length !== 0 ||
            likes?.teams.length !== 0 ||
            likes?.dances.length !== 0 ? (
                <>
                    {likes.pros.length !== 0 && (
                        <>
                            <Typography variant="h6">Pros</Typography>
                            <ProFavorites pros={likes.pros} />
                        </>
                    )}

                    {likes.teams.length !== 0 && (
                        <>
                            <Typography variant="h6">Teams</Typography>
                            <TeamFavorites teams={likes.teams} />
                        </>
                    )}

                    {likes.dances.length !== 0 && (
                        <>
                            <Typography variant="h6">Dances</Typography>
                            <DanceFavorites dances={likes.dances} />
                        </>
                    )}
                </>
            ) : (
                <Typography>No favorites yet 💔</Typography>
            )}
        </Box>
    );
}

export default FavoritesWrapper;
