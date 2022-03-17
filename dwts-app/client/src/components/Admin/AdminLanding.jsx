import { Typography } from '@mui/material';
import DailyDancesOverview from './DailyDancesOverview';

function AdminLanding() {
    return (
        <>
            <Typography>Admin Dashboard Landing Component</Typography>

            <Typography>Overview of tables / guides for moderators</Typography>

            <Typography>Recent Activity</Typography>

            <DailyDancesOverview />
        </>
    );
}

export default AdminLanding;
