import { Card, Divider, Typography } from '@mui/material';

function StatisticsOverview() {
    return (
        <Card elevation={3}>
            <Typography variant="h5">Statistics</Typography>
            <Divider />
            <Typography variant="h6">
                Number of perfect scores per pro
            </Typography>
            <Typography variant="h6">Number of finals per pro</Typography>
            <Typography variant="h6">Number of wins per pro</Typography>
            <Typography variant="h6">Highest first week scores</Typography>
            <Typography variant="h6">Earliest perfect scores</Typography>
        </Card>
    );
}

export default StatisticsOverview;
