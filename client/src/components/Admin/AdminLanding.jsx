import RecentLikes from '../Activity/RecentLikes';
import DailyDancesOverview from './DailyDancesOverview';
import AdminOverview from './AdminOverview';
import { Box } from '@mui/material';

function AdminLanding() {
    return (
        <Box>
            <AdminOverview />

            <DailyDancesOverview />

            <RecentLikes />
        </Box>
    );
}

export default AdminLanding;
