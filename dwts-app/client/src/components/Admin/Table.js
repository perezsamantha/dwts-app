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
import { convertBirthday, convertDate, GetCelebName, GetProName, GetSeasonNumber, GetEpisodeNumber, GetJudgeName, GetDanceName, GetTeamName } from '../shared/functions';
import EditDialog from './EditDialog';
import { deletePro, fetchPros, findProById } from '../../actions/pros';
import AddDialog from './AddDialog';

import * as tableType from '../../constants/tableTypes';
import { deleteTeam, fetchTeams, findTeamById } from '../../actions/teams';
import { deleteSeason, fetchSeasons, findSeasonById } from '../../actions/seasons';
import { deleteJudge, fetchJudges, findJudgeById } from '../../actions/judges';
import { deleteEpisode, fetchEpisodes, findEpisodeById } from '../../actions/episodes';
import { deleteDance, fetchDances, findDanceById } from '../../actions/dances';
import { deleteScore, fetchScores, findScoreById } from '../../actions/scores';
import { deleteDancer, fetchDancers, findDancerById } from '../../actions/dancers';

function Table(props) {
    const table = props.type;
    const dispatch = useDispatch();

    const items = useSelector(state => {
        switch (table) {
            case tableType.CELEB:
                return state.data.celebs;
            case tableType.PRO:
                return state.data.pros;
            case tableType.SEASON:
                return state.data.seasons;
            case tableType.EPISODE:
                return state.data.episodes;
            case tableType.TEAM:
                return state.data.teams;
            case tableType.DANCE:
                return state.data.dances;
            case tableType.JUDGE:
                return state.data.judges;
            case tableType.SCORE:
                return state.data.scores;
            case tableType.DANCER:
                return state.data.dancers;
            // case tableType.USER:
            //     return state.users.users;
        }
    })

    const item = useSelector(state => {
        switch (table) {
            case tableType.CELEB:
                return state.data.celeb;
            case tableType.PRO:
                return state.data.pro;
            case tableType.SEASON:
                return state.data.season;
            case tableType.EPISODE:
                return state.data.episode;
            case tableType.TEAM:
                return state.data.team;
            case tableType.DANCE:
                return state.data.dance;
            case tableType.JUDGE:
                return state.data.judge;
            case tableType.SCORE:
                return state.data.score;
            case tableType.DANCER:
                return state.data.dancer;
            // case tableType.USER:
            //     return state.users.user;
        }
    })

    const loading = useSelector(state => {
        switch (table) {
            case tableType.CELEB:
                return state.loading.CELEBSEARCH;
            case tableType.PRO:
                return state.loading.PROSEARCH;
            case tableType.SEASON:
                return state.loading.SEASONSEARCH;
            case tableType.EPISODE:
                return state.loading.EPISODEITEMS;
            case tableType.TEAM:
                return state.loading.TEAMITEMS;
            case tableType.DANCE:
                return state.loading.DANCESEARCH;
            case tableType.JUDGE:
                return state.loading.JUDGESEARCH;
            case tableType.SCORE:
                return state.loading.SCORESEARCH;
            case tableType.DANCER:
                return state.loading.DANCERSEARCH;
            // case tableType.USER:
            //     return state.loading.USERSEARCH;
        }
    })

    useEffect(() => {
        switch (table) {
            case tableType.CELEB:
                dispatch(fetchCelebs());
                break
            case tableType.PRO:
                dispatch(fetchPros());
                break
            case tableType.SEASON:
                dispatch(fetchSeasons());
                break
            case tableType.EPISODE:
                dispatch(fetchEpisodes());
                break
            case tableType.TEAM:
                dispatch(fetchTeams());
                break
            case tableType.DANCE:
                dispatch(fetchDances());
                break
            case tableType.JUDGE:
                dispatch(fetchJudges());
                break
            case tableType.SCORE:
                dispatch(fetchScores());
                break
            case tableType.DANCER:
                dispatch(fetchDancers());
                break
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
            case tableType.CELEB:
                dispatch(findCelebById(id));
                break
            case tableType.PRO:
                dispatch(findProById(id));
                break
            case tableType.SEASON:
                dispatch(findSeasonById(id));
                break
            case tableType.EPISODE:
                dispatch(findEpisodeById(id));
                break
            case tableType.TEAM:
                dispatch(findTeamById(id));
                break
            case tableType.DANCE:
                dispatch(findDanceById(id));
                break
            case tableType.JUDGE:
                dispatch(findJudgeById(id));
                break
            case tableType.SCORE:
                dispatch(findScoreById(id));
                break
            case tableType.DANCER:
                dispatch(findDancerById(id));
                break
            // case tableType.USER:

            //     break
        }
        setOpen({ edit: true })
    }

    const handleDelete = (id) => {
        switch (table) {
            case tableType.CELEB:
                dispatch(findCelebById(id));
                break
            case tableType.PRO:
                dispatch(findProById(id));
                break
            case tableType.SEASON:
                dispatch(findSeasonById(id));
                break
            case tableType.EPISODE:
                dispatch(findEpisodeById(id));
                break
            case tableType.TEAM:
                dispatch(findTeamById(id));
                break
            case tableType.DANCE:
                dispatch(findDanceById(id));
                break
            case tableType.JUDGE:
                dispatch(findJudgeById(id));
                break
            case tableType.SCORE:
                dispatch(findScoreById(id));
                break
            case tableType.DANCER:
                dispatch(findDancerById(id));
                break
            // case tableType.USER:

            //     break
        }
        setOpen({ delete: true, id: id });
    }

    const confirmDelete = () => {
        switch (table) {
            case tableType.CELEB:
                dispatch(deleteCeleb(open.id));
                break
            case tableType.PRO:
                dispatch(deletePro(open.id));
                break
            case tableType.SEASON:
                dispatch(deleteSeason(open.id));
                break
            case tableType.EPISODE:
                dispatch(deleteEpisode(open.id));
                break
            case tableType.TEAM:
                dispatch(deleteTeam(open.id));
                break
            case tableType.DANCE:
                dispatch(deleteDance(open.id));
                break
            case tableType.JUDGE:
                dispatch(deleteJudge(open.id));
                break
            case tableType.SCORE:
                dispatch(deleteScore(open.id));
                break
            case tableType.DANCER:
                dispatch(deleteDancer(open.id));
                break
            // case tableType.USER:

            //     break
        }
        setOpen({ edit: false, delete: false, id: null })
    }

    let columns;
    //const columns = () => {
    switch (table) {

        case tableType.CELEB:
        case tableType.PRO:
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

        case tableType.EPISODE:
            columns = [
                { field: 'id', headerName: 'ID', width: 40 },
                {
                    field: 'season_id', headerName: 'Season', width: 75,
                    valueGetter: seasonGetter
                },
                { field: 'week', headerName: 'Week', width: 75 },
                { field: 'night', headerName: 'Night', width: 75 },
                {
                    field: 'dateGetter', headerName: 'Date', width: 100,
                    valueGetter: convertDate
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

        case tableType.TEAM:
            columns = [
                { field: 'id', headerName: 'ID', width: 40 },
                {
                    field: 'cover_pic', headerName: 'Pic', width: 60,
                    renderCell: (params) => <Avatar src={params.value} />
                },
                {
                    field: 'celeb_id', headerName: 'Celeb', width: 100,
                    valueGetter: celebGetter
                },
                {
                    field: 'pro_id', headerName: 'Pro', width: 100,
                    valueGetter: proGetter
                },
                {
                    field: 'mentor_id', headerName: 'Mentor', width: 100,
                    valueGetter: proGetter
                },
                {
                    field: 'season_id', headerName: 'Season', width: 75,
                    valueGetter: seasonGetter
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

        case tableType.DANCE:
            columns = [
                { field: 'id', headerName: 'ID', width: 40 },
                {
                    field: 'episode_id', headerName: 'Episode', width: 100,
                    valueGetter: episodeGetter
                },
                { field: 'style', headerName: 'Style', width: 100 },
                { field: 'theme', headerName: 'Theme', width: 100 },
                { field: 'running_order', headerName: 'RO', width: 50 },
                { field: 'song_title', headerName: 'Song', width: 175 },
                { field: 'song_artist', headerName: 'Artist', width: 175 },
                { field: 'link', headerName: 'Link', width: 150 },
                { field: 'extra', headerName: 'Extra', width: 150 },
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

        case tableType.SCORE:
            columns = [
                { field: 'id', headerName: 'ID', width: 40 },
                {
                    field: 'dance_id', headerName: 'Dance', width: 450,
                    valueGetter: danceGetter,
                },
                {
                    field: 'judge_id', headerName: 'Judge', width: 150,
                    valueGetter: judgeGetter,
                },
                { field: 'value', headerName: 'Value', width: 100 },
                { field: 'order', headerName: 'Order', width: 100 },
                { field: 'is_guest', headerName: 'Guest?', width: 100 },
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

        case tableType.DANCER:
            columns = [
                { field: 'id', headerName: 'ID', width: 40 },
                {
                    field: 'dance_id', headerName: 'Dance', width: 450,
                    valueGetter: danceGetter
                },
                {
                    field: 'team_id', headerName: 'Team', width: 100,
                    valueGetter: teamGetter
                },
                {
                    field: 'pro_id', headerName: 'Pro', width: 100,
                    valueGetter: proGetter
                },
                {
                    field: 'celeb_id', headerName: 'Celeb', width: 100,
                    valueGetter: celebGetter
                },
                { field: 'is_background', headerName: 'Background?', width: 100 },
                { field: 'extra', headerName: 'Extra', width: 150 },
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

    function celebGetter(params) {
        return GetCelebName(params.value);
    }

    function proGetter(params) {
        return GetProName(params.value);
    }

    function seasonGetter(params) {
        return GetSeasonNumber(params.value);
    }

    function teamGetter(params) {
        return GetTeamName(params.value);
    }

    function episodeGetter(params) {
        return GetEpisodeNumber(params.value);
    }

    function judgeGetter(params) {
        return GetJudgeName(params.value);
    }

    function danceGetter(params) {
        return GetDanceName(params.value);
    }

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <TableContainer>
                <HeaderContainer>
                    <Typography variant="h4">{table}s Table</Typography>
                    <AddDialog
                        table={table}
                    />
                </HeaderContainer>

                {<div>
                    <DataGridContainer>
                        <DataGrid
                            rows={items}
                            columns={columns}
                            loading={loading}
                        //checkboxSelection
                        />
                    </DataGridContainer>

                    {open.edit && <EditDialog
                        item={item}
                        table={table}
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