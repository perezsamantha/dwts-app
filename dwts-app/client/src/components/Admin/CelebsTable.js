import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

import { useDispatch, useSelector } from 'react-redux';
import { fetchCelebs, deleteCeleb } from '../../actions/celebs';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CelebAdd from '../Celebs/CelebAdd';
import { TableContainer, DataGridContainer } from '../shared/shared';


function CelebsTable(props) {
    const dispatch = useDispatch();
    const celebs = useSelector(state => state.celebs.celebs);

    useEffect(() => {
        dispatch(fetchCelebs());
    }, [dispatch]);

    const handleEdit = (id) => {
        
    }

    const handleDelete = (id) => {
        dispatch(deleteCeleb(id));
    }

    const convertBirthday = (params) => {
        const date = new Date(params.getValue(params.id, 'birthday'));
        return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 40 },
        { field: 'first_name', headerName: 'First Name', width: 100 },
        { field: 'last_name', headerName: 'Last Name', width: 100 },
        {
            field: 'birthdayGetter', headerName: 'Birthday', width: 100,
            valueGetter: convertBirthday,
        },
        { field: 'height', headerName: 'Height', width: 80 },
        { field: 'gender', headerName: 'Gender', width: 80 },
        { field: 'twitter', headerName: 'Twitter', width: 100 },
        { field: 'instagram', headerName: 'Instagram', width: 100 },
        { field: 'tiktok', headerName: 'TikTok', width: 100 },
        { field: 'is_junior', headerName: 'Junior?', width: 100 },
        {
            field: 'actions',
            type: 'actions',
            width: 30,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    onClick={() => handleEdit(params.id)}
                    showInMenu
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => handleDelete(params.id)}
                    showInMenu
                />,
            ],
        },
    ];

    return (
        <TableContainer>
            <h3>Celebs Table</h3>
            {<CelebAdd />}
            {/* weird issue with spacing once component is brought in??? */}
            <DataGridContainer>
                <DataGrid
                    rows={celebs}
                    columns={columns}
                //checkboxSelection
                />
            </DataGridContainer>
        </TableContainer>
    )
}

export default CelebsTable;