import RecentLikes from '../Activity/RecentLikes';
import DailyDancesOverview from './DailyDancesOverview';
import AdminOverview from './AdminOverview';
import { Box } from '@mui/material';
import RecentScores from '../Activity/RecentScores';

function AdminLanding() {
    return (
        <Box>
            <AdminOverview />

            <DailyDancesOverview />

            <RecentScores />

            <RecentLikes />
        </Box>
    );
}

export default AdminLanding;
