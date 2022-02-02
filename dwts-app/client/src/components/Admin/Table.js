import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { Avatar, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';

import { TableContainer, DataGridContainer, HeaderContainer } from '../shared/shared';
import { fetchCelebs, deleteCeleb, findCelebById } from '../../actions/celebs';
import CelebAdd from '../Celebs/CelebAdd';
import DeleteDialog from './DeleteDialog';
import { convertBirthday } from '../shared/functions';
import EditDialog from './EditDialog';
import { deletePro, fetchPros, findProById } from '../../actions/pros';
import ProAdd from '../Pros/ProAdd';
import AddDialog from './AddDialog';

function Table(props) {
    const table = props.type;
    const dispatch = useDispatch();

    const items = useSelector(state => {
        switch (table) {
            case 'Celeb':
                return state.celebs.celebs;
            case 'Pro':
                return state.pros.pros;
        }
    })

    const item = useSelector(state => {
        switch (table) {
            case 'Celeb':
                return state.celebs.celeb;
            case 'Pro':
                return state.pros.pro;
        }
    })

    const loading = useSelector(state => {
        switch (table) {
            case 'Celeb':
                return state.loading.CELEBSEARCH;
            case 'Pro':
                return state.loading.PROSEARCH;
        }
    })

    useEffect(() => {
        switch (table) {
            case 'Celeb':
                return dispatch(fetchCelebs());
            case 'Pro':
                return dispatch(fetchPros());
        }
    }, [dispatch]);

    const [open, setOpen] = useState({
        edit: false,
        delete: false,
        id: null
    });

    const handleClose = () => {
        setOpen({ edit: false, delete: false, id: null })
    };

    const handleEdit = async (id) => {
        switch (table) {
            case 'Celeb':
                dispatch(findCelebById(id));
                break
            case 'Pro':
                dispatch(findProById(id));
                break
        }
        setOpen({ edit: true })
    }

    const handleDelete = (id) => {
        switch (table) {
            case 'Celeb':
                dispatch(findCelebById(id));
                break
            case 'Pro':
                dispatch(findProById(id));
                break
        }
        setOpen({ delete: true, id: id })
    }

    const confirmDelete = () => {
        switch (table) {
            case 'Celeb':
                dispatch(deleteCeleb(open.id));
                break
            case 'Pro':
                dispatch(deletePro(open.id));
                break
        }
        setOpen({ edit: false, delete: false, id: null })
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 40 },
        {
            field: 'cover_pic', headerName: 'Pic', width: '60',
            renderCell: (params) => <Avatar src={params.value} />
        },
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
        {
            field: 'is_junior', headerName: 'Junior?', width: 75,
            renderCell: (params) => params.value ? 'Yes' : 'No'
        },
        {
            field: 'actions',
            //headerName: 'Actions',
            type: 'actions',
            width: 50,
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
        <LocalizationProvider dateAdapter={DateAdapter}>
            <TableContainer>
                <HeaderContainer>
                    <Typography variant="h4">{table}s Table</Typography>
                    <AddDialog
                        table={table}
                    />
                </HeaderContainer>

                {loading ? <div>loading bar</div> : <div>
                    <DataGridContainer>
                        <DataGrid
                            rows={items}
                            columns={columns}
                        //checkboxSelection
                        />
                    </DataGridContainer>

                    {/* <CelebEdit celeb={celeb} open={open.edit} handleClose={handleClose} /> */}

                    {open.edit && <EditDialog
                        item={item}
                        open={open.edit}
                        handleClose={handleClose}
                        table={table}
                    />}

                    {open.delete && <DeleteDialog
                        item={`${item?.first_name} ${item?.last_name}`}
                        table={table}
                        open={open.delete}
                        handleClose={handleClose}
                        confirmDelete={confirmDelete}
                    />}

                </div>}

            </TableContainer>
        </LocalizationProvider>
    )
}

export default Table;