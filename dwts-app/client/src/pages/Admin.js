import React from 'react';
import AdminDashboard from '../components/Admin/AdminDashboard';
import styled from 'styled-components';

function Admin(props) {
    localStorage.setItem('parentPath', window.location.pathname);
    
    return(
        <Container>
            <AdminDashboard toggleDark={props.toggleDark} setToggleDark={props.setToggleDark} />
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
`;

export default Admin;