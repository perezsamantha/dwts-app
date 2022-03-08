import { Divider, Typography } from '@mui/material';
import { CardContainer } from '../sharedStyles';

function Throwbacks() {
    return (
        <CardContainer elevation={3}>
            <Typography variant="h5">On this day...</Typography>
            <Divider />
            <Typography>
                2 years ago - Season 30 &#8226; Week 10 (Semi-Finals)
            </Typography>
            <Typography>
                4 years ago - A Night to Remember Tour kicked off
            </Typography>
            <Typography>
                9 years ago - Season 15 &#8226; Week 10 (Semi-Finals)
            </Typography>
        </CardContainer>
    );
}

export default Throwbacks;
