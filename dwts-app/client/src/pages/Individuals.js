import React from 'react';
import styled from 'styled-components';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';
import { Route, Switch } from 'react-router-dom';
import TeamCard from '../components/Cards/TeamCard';

function Individuals() {
    return (
        <Page>
            <Switch>
                <Route exact path="/teams/:id">
                    <TeamCard />
                </Route>
            </Switch>
            <BottomNavBar />
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