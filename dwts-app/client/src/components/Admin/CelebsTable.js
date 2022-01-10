import React, { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

import { useDispatch, useSelector } from 'react-redux';
import { fetchCelebs, deleteCeleb, findCelebById } from '../../actions/celebs';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CelebAdd from '../Celebs/CelebAdd';
import { TableContainer, DataGridContainer, HeaderContainer } from '../shared/shared';
import { Typography } from '@mui/material';
import CelebEdit from '../Celebs/CelebEdit';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, TextField } from '@mui/material';

import { updateCeleb } from '../../actions/celebs';
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { genders } from '../../constants/dropdowns';

function CelebsTable(props) {
    const dispatch = useDispatch();
    const celebs = useSelector(state => state.celebs.celebs);

    useEffect(() => {
        dispatch(fetchCelebs());
    }, [dispatch]);

    const [open, setOpen] = useState(false);
    const celeb = useSelector(state => state.celebs.celeb);
    const [formData, setFormData] = useState(null);

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = async (id) => {
        dispatch(findCelebById(id));
        setOpen(true);
    }

    const handleDelete = (id) => {
        dispatch(deleteCeleb(id));
        // confirm deletion modal
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
            width: 90,
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
        // {
        //     field: 'actions2',
        //     type: 'actions',
        //     width: 30,
        //     headerName: 'Delete',
        //     getActions: (params) => [
        //         <GridActionsCellItem
        //             icon={<DeleteIcon />}
        //             label="Delete"
        //             onClick={() => handleDelete(params.id)}
        //         />,
        //     ],
        // },
    ];

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <TableContainer>
                <HeaderContainer>
                    <Typography variant="h4">Celebs Table</Typography>
                    {/* <h3>Celebs Table</h3> */}
                    {<CelebAdd />}
                </HeaderContainer>
                {/* <h3>Celebs Table</h3>
            {<CelebAdd />} */}
                {/* weird issue with spacing once component is brought in??? */}
                <DataGridContainer>
                    <DataGrid
                        rows={celebs}
                        columns={columns}
                    //checkboxSelection
                    />
                </DataGridContainer>
                
                {<CelebEdit celeb={celeb} open={open} handleClose={handleClose} />}

                
            </TableContainer>
        </LocalizationProvider>
    )
}

export default CelebsTable;