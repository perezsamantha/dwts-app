import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { Avatar, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';

import { TableContainer, DataGridContainer, HeaderContainer } from '../shared/shared';
import { fetchPros, deletePro, findProById } from '../../actions/pros';
import ProAdd from '../Pros/ProAdd';
import DeleteDialog from './DeleteDialog';
import { convertBirthday } from '../shared/functions';
import EditDialog from './EditDialog';


function ProsTable() {
    const dispatch = useDispatch();
    const pros = useSelector(state => state.pros.pros);
    const pro = useSelector(state => state.pros.pro);
    const loading = useSelector(state => state.loading.PROSEARCH);

    useEffect(() => {
        dispatch(fetchPros());
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
        dispatch(findProById(id));
        setOpen({ edit: true })
    }

    const handleDelete = (id) => {
        dispatch(findProById(id));
        setOpen({ delete: true, id: id })
    }

    const confirmDelete = () => {
        dispatch(deletePro(open.id));
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
                    <Typography variant="h4">Pros Table</Typography>
                    <ProAdd />
                </HeaderContainer>

                {loading ? <div>loading bar</div> : <div>
                    <DataGridContainer>
                        <DataGrid
                            rows={pros}
                            columns={columns}
                        //checkboxSelection
                        />
                    </DataGridContainer>


                    {open.edit && <EditDialog
                        item={pro}
                        open={open.edit}
                        handleClose={handleClose}
                        table={'Pro'}
                    />}

                    {open.delete && <DeleteDialog
                        item={`${pro?.first_name} ${pro?.last_name}`}
                        table={'Pros'}
                        open={open.delete}
                        handleClose={handleClose}
                        confirmDelete={confirmDelete}
                    />}

                </div>}

            </TableContainer>
        </LocalizationProvider>
    )
}

export default ProsTable;