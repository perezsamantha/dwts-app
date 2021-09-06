import React from 'react';
import styled from 'styled-components';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';
import { Outlet } from 'react-router-dom';
import TeamCard from '../components/Cards/TeamCard';

function Individuals() {
    const pathname = window.location.pathname;

    const category = pathname.split("/")[1];

    return (
        <Page>
            {category === "teams" && <TeamCard />}
            {/* <Routes>
                <Route path="/teams/:id">
                    <TeamCard />
                </Route>
            </Routes> */}
            <BottomNavBar />
            <Outlet />
        </Page>
    )
}

const Page = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(18, 18, 18);
`;

export default Individuals;