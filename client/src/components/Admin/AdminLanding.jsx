import { Typography } from '@mui/material';
import RecentLikes from '../Activity/RecentLikes';
import DailyDancesOverview from './DailyDancesOverview';
import AdminOverview from './AdminOverview';

function AdminLanding() {
    return (
        <>
            <Typography>Admin Dashboard Landing Component</Typography>

            <AdminOverview />

            <DailyDancesOverview />

            <RecentLikes />
        </>
    );
}

export default AdminLanding;
