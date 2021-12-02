import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';

import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams } from '../../actions/teams';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'celeb_id', headerName: 'Celeb', width: 70 },
    { field: 'pro_id', headerName: 'Pro', width: 70 },
    { field: 'mentor_id', headerName: 'Mentor', width: 70 },
    { field: 'season_id', headerName: 'Season', width: 70 },
    { field: 'placement', headerName: 'Placement', width: 80 },
    { field: 'team_name', headerName: 'Team Name', width: 130 },
    { field: 'extra', headerName: 'Extra', width: 130 },
    // {
    //     field: 'age',
    //     headerName: 'Age',
    //     type: 'number',
    //     width: 90,
    // },
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params) =>
    //         `${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''
    //         }`,
    // },
];


function TeamsTable(props) {
    const dispatch = useDispatch();
    const teams = useSelector(state => state.teams.teams);

    useEffect(() => {
        dispatch(fetchTeams());
    }, [dispatch]);

    return (
        <Container>
            <Title>Testinggg</Title>
            <div style={{ height: 400, width: '85%', margin: "auto" }}>
                        <DataGrid
                            rows={teams}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                        />
                    </div>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled.h3`
    color: green;
`;

export default TeamsTable;