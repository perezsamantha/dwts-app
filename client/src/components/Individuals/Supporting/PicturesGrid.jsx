import { Box, Grid } from '@mui/material';
import { ExtraPic } from '../../shared/muiStyles';
import { motion } from 'framer-motion';

function PicturesGrid(props) {
    const { pictures } = props;
    if (pictures === null) {
        return <></>;
    }

    return (
        <Grid container justifyContent="center" spacing={1} my={1}>
            {pictures.map((picture, index) => (
                <Grid key={index} item>
                    <Box
                        component={motion.div}
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.3 },
                        }}
                        whileTap={{
                            scale: 1.075,
                            transition: { duration: 0.3 },
                        }}
                    >
                        <ExtraPic
                            component="img"
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = '/defaultPic.png';
                            }}
                            src={picture}
                        />
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
}

export default PicturesGrid;
