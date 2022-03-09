import { Card, Divider, Typography } from '@mui/material';

function Throwbacks() {
    return (
        <Card elevation={3}>
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
        </Card>
    );
}

export default Throwbacks;
