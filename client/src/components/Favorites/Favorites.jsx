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
                        <Box mb={1}>
                            <Typography variant="h6" align="left">
                                Pros
                            </Typography>
                            <ProFavorites pros={likes.pros} />
                        </Box>
                    )}

                    {likes.teams.length !== 0 && (
                        <Box mb={1}>
                            <Typography variant="h6" align="left">
                                Teams
                            </Typography>
                            <TeamFavorites teams={likes.teams} />
                        </Box>
                    )}

                    {likes.dances.length !== 0 && (
                        <Box mb={1}>
                            <Typography variant="h6" align="left" mb={1}>
                                Dances
                            </Typography>
                            <DanceFavorites dances={likes.dances} />
                        </Box>
                    )}
                </>
            ) : (
                <Typography>No favorites yet</Typography>
            )}
        </Box>
    );
}

export default FavoritesWrapper;
