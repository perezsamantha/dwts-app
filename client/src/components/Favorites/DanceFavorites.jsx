import { Box, Grid, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import DancePreview from './DancePreview';
import { motion } from 'framer-motion';

function DanceFavorites(props) {
    const { dances } = props;

    return (
        <Stack>
            <Grid container spacing={1.5}>
                {dances.map((dance, index) => (
                    <Grid
                        item
                        key={index}
                        width={{
                            xs: 1,
                            sm: 1 / 2,
                            md: 1 / 3,
                            lg: 1 / 4,
                            xl: 1 / 5,
                        }}
                    >
                        <Link
                            key={index}
                            to={{ pathname: `/dances/${dance.id}` }}
                            style={{
                                textDecoration: 'inherit',
                                color: 'inherit',
                            }}
                        >
                            <Box
                                component={motion.div}
                                whileHover={{
                                    scale: 1.025,
                                    transition: { duration: 0.3 },
                                }}
                            >
                                <DancePreview dance={dance} />
                            </Box>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}

export default DanceFavorites;
