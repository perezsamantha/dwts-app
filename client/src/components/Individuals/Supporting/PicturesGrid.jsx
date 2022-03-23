import { Grid } from '@mui/material';
import { ExtraPic } from '../../shared/muiStyles';

function PicturesGrid(props) {
    const { pictures } = props;
    if (pictures === null) {
        return <></>;
    }

    return (
        <Grid container justifyContent="center" spacing={1} my={1}>
            {pictures.map((picture, index) => (
                <Grid key={index} item>
                    <ExtraPic component="img" src={picture} />
                </Grid>
            ))}
        </Grid>
    );
}

export default PicturesGrid;
