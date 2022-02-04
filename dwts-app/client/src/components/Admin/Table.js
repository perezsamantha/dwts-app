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
import DeleteDialog from './DeleteDialog';
import { convertBirthday } from '../shared/functions';
import EditDialog from './EditDialog';
import { deletePro, fetchPros, findProById } from '../../actions/pros';
import AddDialog from './AddDialog';

import * as tableType from '../../constants/tableTypes';
import { deleteTeam, fetchTeams, findTeamById, getTeamsItems } from '../../actions/teams';
import { deleteSeason, fetchSeasons, findSeasonById } from '../../actions/seasons';
import { deleteJudge, fetchJudges, findJudgeById } from '../../actions/judges';

function Table(props) {
    const table = props.type;
    const dispatch = useDispatch();

    // for FK dropdowns
    const celebs = useSelector(state => state.teams.celebs);
    // const [dropdownItems, setDropdownItems] = useState({
    //     celebs: [],
    //     pros: []
    // })
    const pros = useSelector(state => state.teams.pros);
    const seasons = useSelector(state => state.teams.seasons);

    const items = useSelector(state => {
        switch (table) {
            case 'Celeb':
                return state.celebs.celebs;
            case 'Pro':
                return state.pros.pros;
            case tableType.SEASON:
                return state.seasons.seasons;
            case tableType.TEAM:
                return state.teams.teams;
            //case tableType.DANCE:
            //return state.dances.dances;
            case tableType.JUDGE:
                return state.judges.judges;
            // case tableType.SCORE:
            //     return state.scores.scores;
            // case tableType.USER:
            //     return state.users.users;
        }
    })

    const item = useSelector(state => {
        switch (table) {
            case 'Celeb':
                return state.celebs.celeb;
            case 'Pro':
                return state.pros.pro;
            case tableType.SEASON:
                return state.seasons.season;
            case tableType.TEAM:
                return state.teams.team;
            //case tableType.DANCE:
            //return state.dances.dance;
            case tableType.JUDGE:
                return state.judges.judge;
            // case tableType.SCORE:
            //     return state.scores.score;
            // case tableType.USER:
            //     return state.users.user;
        }
    })

    const loading = useSelector(state => {
        switch (table) {
            case 'Celeb':
                return state.loading.CELEBSEARCH;
            case 'Pro':
                return state.loading.PROSEARCH;
            case tableType.SEASON:
                return state.loading.SEASONSEARCH;
            case tableType.TEAM:
                return state.loading.TEAMITEMS;
            //case tableType.DANCE:
            //return state.loading.DANCEITEMS; ??
            case tableType.JUDGE:
                return state.loading.JUDGESEARCH;
            // case tableType.SCORE:
            //     return state.loading.SCOREITEMS; ??
            // case tableType.USER:
            //     return state.loading.USERSEARCH;
        }
    })

    useEffect(() => {
        switch (table) {
            case 'Celeb':
                dispatch(fetchCelebs());
                break
            case 'Pro':
                dispatch(fetchPros());
                break
            case tableType.SEASON:
                dispatch(fetchSeasons());
                break
            case tableType.TEAM:
                dispatch(getTeamsItems());
                break
            // case tableType.DANCE:

            //     break
            case tableType.JUDGE:
                dispatch(fetchJudges());
                break
            // case tableType.SCORE:

            //     break
            // case tableType.USER:

            //     break
        }
    }, [dispatch]);

    const [open, setOpen] = useState({
        edit: false,
        delete: false,
        id: null,
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
            case tableType.SEASON:
                dispatch(findSeasonById(id));
                break
            case tableType.TEAM:
                dispatch(findTeamById(id));
                break
            // case tableType.DANCE:

            //     break
            case tableType.JUDGE:
                dispatch(findJudgeById(id));
                break
            // case tableType.SCORE:

            //     break
            // case tableType.USER:

            //     break
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
            case tableType.SEASON:
                dispatch(findSeasonById(id));
                break
            case tableType.TEAM:
                dispatch(findTeamById(id));
                break
            // case tableType.DANCE:

            //     break
            case tableType.JUDGE:
                dispatch(findJudgeById(id));
                break
            // case tableType.SCORE:

            //     break
            // case tableType.USER:

            //     break
        }
        setOpen({ delete: true, id: id });
    }

    const confirmDelete = () => {
        switch (table) {
            case 'Celeb':
                dispatch(deleteCeleb(open.id));
                break
            case 'Pro':
                dispatch(deletePro(open.id));
                break
            case tableType.SEASON:
                dispatch(deleteSeason(open.id));
                break
            case tableType.TEAM:
                dispatch(deleteTeam(open.id));
                break
            // case tableType.DANCE:

            //     break
            case tableType.JUDGE:
                dispatch(deleteJudge(open.id));
                break
            // case tableType.SCORE:

            //     break
            // case tableType.USER:

            //     break
        }
        setOpen({ edit: false, delete: false, id: null })
    }

    let columns;
    //const columns = () => {
    switch (table) {

        case 'Celeb':
        case 'Pro':
            columns = [
                { field: 'id', headerName: 'ID', width: 40 },
                {
                    field: 'cover_pic', headerName: 'Pic', width: 60,
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
            ]
            break

        case tableType.SEASON:
            columns = [
                { field: 'id', headerName: 'ID', width: 40 },
                {
                    field: 'cover_pic', headerName: 'Pic', width: 60,
                    renderCell: (params) => <Avatar src={params.value} />
                },
                { field: 'number', headerName: 'Number', width: 75 },
                { field: 'extra', headerName: 'Extra', width: 250 },
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
            ]
            break

        case tableType.TEAM:
            columns = [
                { field: 'id', headerName: 'ID', width: 40 },
                {
                    field: 'cover_pic', headerName: 'Pic', width: 60,
                    renderCell: (params) => <Avatar src={params.value} />
                },
                {
                    field: 'celeb_id', headerName: 'Celeb', width: 100,
                    valueGetter: getCelebName
                },
                {
                    field: 'pro_id', headerName: 'Pro', width: 100,
                    valueGetter: getProName
                },
                {
                    field: 'mentor_id', headerName: 'Mentor', width: 100,
                    valueGetter: getProName
                },
                {
                    field: 'season_id', headerName: 'Season', width: 75,
                    valueGetter: getSeasonNumber
                },
                { field: 'placement', headerName: 'Place', width: 100 },
                { field: 'team_name', headerName: 'Team Name', width: 150 },
                { field: 'extra', headerName: 'Extra', width: 250 },
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
            ]
            break

        case tableType.JUDGE:
            columns = [
                { field: 'id', headerName: 'ID', width: 40 },
                { field: 'first_name', headerName: 'First Name', width: 100 },
                { field: 'last_name', headerName: 'Last Name', width: 100 },
                {
                    field: 'birthdayGetter', headerName: 'Birthday', width: 100,
                    valueGetter: convertBirthday,
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
            ]
            break

        default:
            columns = [];
    };

    function getCelebName(params) {
        let celebName;
        celebs.map(celeb => celeb.id === params.value ? celebName = `${celeb.first_name} ${celeb?.last_name}` : '');
        return celebName;
    }

    function getProName(params) {
        let proName;
        pros.map(pro => pro.id === params.value ? proName = `${pro.first_name} ${pro?.last_name}` : '');
        return proName;
    }

    function getSeasonNumber(params) {
        let seasonNumber;
        seasons.map(season => season.id === params.value ? seasonNumber = `${season.number}` : '');
        return seasonNumber;
    }

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <TableContainer>
                <HeaderContainer>
                    <Typography variant="h4">{table}s Table</Typography>
                    <AddDialog
                        table={table}
                        celebs={celebs}
                        pros={pros}
                        seasons={seasons}
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

                    {open.edit && <EditDialog
                        item={item}
                        table={table}
                        celebs={celebs}
                        pros={pros}
                        seasons={seasons}
                        open={open.edit}
                        handleClose={handleClose}
                    />}

                    {open.delete && <DeleteDialog
                        item={item}
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