import React from 'react';
import AdminDashboard from '../components/Admin/AdminDashboard';
import { Box } from '@mui/material';

function Admin(props) {
    localStorage.setItem('parentPath', window.location.pathname);

    return (
        <Box>
            <AdminDashboard
                toggleDark={props.toggleDark}
                setToggleDark={props.setToggleDark}
            />
        </Box>
    );
}

export default Admin;
