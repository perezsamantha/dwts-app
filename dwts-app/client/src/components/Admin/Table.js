import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { Avatar, Box, Stack, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';

import {
    TableContainer,
    DataGridContainer,
    HeaderContainer,
} from '../shared/regStyles';
import { convertDate, convertHeight } from '../shared/functions';
import AddDialog from './AddDialog';
import EditDialog from './EditDialog';
import DeleteDialog from './DeleteDialog';

import * as tableType from '../../constants/tableTypes';
import { deleteCeleb, fetchCelebs, findCelebById } from '../../actions/celebs';
import { deletePro, fetchPros, findProById } from '../../actions/pros';
import { deleteTeam, fetchTeams, findTeamById } from '../../actions/teams';
import {
    deleteSeason,
    fetchSeasons,
    findSeasonById,
} from '../../actions/seasons';
import { deleteJudge, fetchJudges, findJudgeById } from '../../actions/judges';
import {
    deleteEpisode,
    fetchEpisodes,
    findEpisodeById,
} from '../../actions/episodes';
import { deleteDance, fetchDances, findDanceById } from '../../actions/dances';
import { deleteScore, fetchScores, findScoreById } from '../../actions/scores';
import {
    deleteDancer,
    fetchDancers,
    findDancerById,
} from '../../actions/dancers';
import {
    deleteTour,
    deleteTourCast,
    fetchTours,
    fetchTourCast,
    findTourById,
    findTourCastById,
} from '../../actions/tours';
import { deleteUser, fetchUsers, findUserById } from '../../actions/fans';
import DataGetter from '../shared/DataGetter';

function Table(props) {
    const table = props.type;
    const dispatch = useDispatch();

    const items = useSelector((state) => {
        switch (table) {
            case tableType.CELEB:
                return state.celebs.celebs;
            case tableType.PRO:
                return state.pros.pros;
            case tableType.SEASON:
                return state.seasons.seasons;
            case tableType.EPISODE:
                return state.episodes.episodes;
            case tableType.TEAM:
                return state.teams.teams;
            case tableType.DANCE:
                return state.dances.dances;
            case tableType.JUDGE:
                return state.judges.judges;
            case tableType.SCORE:
                return state.scores.scores;
            case tableType.DANCER:
                return state.dancers.dancers;
            case tableType.TOUR:
                return state.tours.tours;
            case tableType.TOURCAST:
                return state.tours.tourCast;
            case tableType.USER:
                return state.users.users;
            default:
        }
    });

    const item = useSelector((state) => {
        switch (table) {
            case tableType.CELEB:
                return state.celebs.celeb;
            case tableType.PRO:
                return state.pros.pro;
            case tableType.SEASON:
                return state.seasons.season;
            case tableType.EPISODE:
                return state.episodes.episode;
            case tableType.TEAM:
                return state.teams.team;
            case tableType.DANCE:
                return state.dances.dance;
            case tableType.JUDGE:
                return state.judges.judge;
            case tableType.SCORE:
                return state.scores.score;
            case tableType.DANCER:
                return state.dancers.dancer;
            case tableType.TOUR:
                return state.tours.tour;
            case tableType.TOURCAST:
                return state.tours.castMember;
            case tableType.USER:
                return state.users.user;
            default:
        }
    });

    const loading = useSelector((state) => {
        switch (table) {
            case tableType.CELEB:
                return state.loading.CELEBSEARCH;
            case tableType.PRO:
                return state.loading.PROSEARCH;
            case tableType.SEASON:
                return state.loading.SEASONSEARCH;
            case tableType.EPISODE:
                return state.loading.EPISODESEARCH;
            case tableType.TEAM:
                return state.loading.TEAMSEARCH;
            case tableType.DANCE:
                return state.loading.DANCESEARCH;
            case tableType.JUDGE:
                return state.loading.JUDGESEARCH;
            case tableType.SCORE:
                return state.loading.SCORESEARCH;
            case tableType.DANCER:
                return state.loading.DANCERSEARCH;
            case tableType.TOUR:
                return state.loading.TOURSEARCH;
            case tableType.TOURCAST:
                return state.loading.TOURCASTSEARCH;
            case tableType.USER:
                return state.loading.USERSEARCH;
            default:
        }
    });

    useEffect(() => {
        switch (table) {
            case tableType.CELEB:
                dispatch(fetchCelebs());
                break;
            case tableType.PRO:
                dispatch(fetchPros());
                break;
            case tableType.SEASON:
                dispatch(fetchSeasons());
                break;
            case tableType.EPISODE:
                dispatch(fetchEpisodes());
                break;
            case tableType.TEAM:
                dispatch(fetchTeams());
                break;
            case tableType.DANCE:
                dispatch(fetchDances());
                break;
            case tableType.JUDGE:
                dispatch(fetchJudges());
                break;
            case tableType.SCORE:
                dispatch(fetchScores());
                break;
            case tableType.DANCER:
                dispatch(fetchDancers());
                break;
            case tableType.TOUR:
                dispatch(fetchTours());
                break;
            case tableType.TOURCAST:
                dispatch(fetchTourCast());
                break;
            case tableType.USER:
                dispatch(fetchUsers());
                break;
            default:
        }
    }, [dispatch, table]);

    const [open, setOpen] = useState({
        edit: false,
        delete: false,
        id: null,
    });

    const handleClose = () => {
        setOpen({ edit: false, delete: false, id: null });
    };

    const handleEdit = (id) => {
        switch (table) {
            case tableType.CELEB:
                dispatch(findCelebById(id));
                break;
            case tableType.PRO:
                dispatch(findProById(id));
                break;
            case tableType.SEASON:
                dispatch(findSeasonById(id));
                break;
            case tableType.EPISODE:
                dispatch(findEpisodeById(id));
                break;
            case tableType.TEAM:
                dispatch(findTeamById(id));
                break;
            case tableType.DANCE:
                dispatch(findDanceById(id));
                break;
            case tableType.JUDGE:
                dispatch(findJudgeById(id));
                break;
            case tableType.SCORE:
                dispatch(findScoreById(id));
                break;
            case tableType.DANCER:
                dispatch(findDancerById(id));
                break;
            case tableType.TOUR:
                dispatch(findTourById(id));
                break;
            case tableType.TOURCAST:
                dispatch(findTourCastById(id));
                break;
            case tableType.USER:
                dispatch(findUserById(id));
                break;
            default:
        }
        setOpen({ edit: true });
    };

    const handleDelete = (id) => {
        switch (table) {
            case tableType.CELEB:
                dispatch(findCelebById(id));
                break;
            case tableType.PRO:
                dispatch(findProById(id));
                break;
            case tableType.SEASON:
                dispatch(findSeasonById(id));
                break;
            case tableType.EPISODE:
                dispatch(findEpisodeById(id));
                break;
            case tableType.TEAM:
                dispatch(findTeamById(id));
                break;
            case tableType.DANCE:
                dispatch(findDanceById(id));
                break;
            case tableType.JUDGE:
                dispatch(findJudgeById(id));
                break;
            case tableType.SCORE:
                dispatch(findScoreById(id));
                break;
            case tableType.DANCER:
                dispatch(findDancerById(id));
                break;
            case tableType.TOUR:
                dispatch(findTourById(id));
                break;
            case tableType.TOURCAST:
                dispatch(findTourCastById(id));
                break;
            case tableType.USER:
                dispatch(findUserById(id));
                break;
            default:
        }
        setOpen({ delete: true, id: id });
    };

    const confirmDelete = () => {
        switch (table) {
            case tableType.CELEB:
                dispatch(deleteCeleb(open.id));
                break;
            case tableType.PRO:
                dispatch(deletePro(open.id));
                break;
            case tableType.SEASON:
                dispatch(deleteSeason(open.id));
                break;
            case tableType.EPISODE:
                dispatch(deleteEpisode(open.id));
                break;
            case tableType.TEAM:
                dispatch(deleteTeam(open.id));
                break;
            case tableType.DANCE:
                dispatch(deleteDance(open.id));
                break;
            case tableType.JUDGE:
                dispatch(deleteJudge(open.id));
                break;
            case tableType.SCORE:
                dispatch(deleteScore(open.id));
                break;
            case tableType.DANCER:
                dispatch(deleteDancer(open.id));
                break;
            case tableType.TOUR:
                dispatch(deleteTour(open.id));
                break;
            case tableType.TOURCAST:
                dispatch(deleteTourCast(open.id));
                break;
            case tableType.USER:
                dispatch(deleteUser(open.id));
                break;
            default:
        }
        setOpen({ edit: false, delete: false, id: null });
    };

    let columns;
    switch (table) {
        case tableType.CELEB:
        case tableType.PRO:
            columns = [
                { field: 'id', headerName: 'ID', width: 40 },
                {
                    field: 'cover_pic',
                    headerName: 'Pic',
                    width: 60,
                    renderCell: (params) => <Avatar src={params.value} />,
                },
                { field: 'first_name', headerName: 'First Name', width: 100 },
                { field: 'last_name', headerName: 'Last Name', width: 100 },
                {
                    field: 'birthday',
                    headerName: 'Birthday',
                    width: 100,
                    valueGetter: (params) => convertDate(params.value),
                },
                {
                    field: 'height',
                    headerName: 'Height',
                    width: 80,
                    valueGetter: (params) => convertHeight(params.value),
                },
                { field: 'gender', headerName: 'Gender', width: 80 },
                { field: 'twitter', headerName: 'Twitter', width: 100 },
                { field: 'instagram', headerName: 'Instagram', width: 100 },
                { field: 'tiktok', headerName: 'TikTok', width: 100 },
                {
                    field: 'is_junior',
                    headerName: 'Junior?',
                    width: 75,
                    renderCell: (params) => (params.value ? 'Yes' : 'No'),
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
            break;

        case tableType.SEASON:
            columns = [
                { field: 'id', headerName: 'ID', width: 40 },
                {
                    field: 'cover_pic',
                    headerName: 'Pic',
                    width: 60,
                    renderCell: (params) => <Avatar src={params.value} />,
                },
                // { field: 'number', headerName: 'Number', width: 75 },
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
            ];
            break;

        case tableType.EPISODE:
            columns = [
                { field: 'id', headerName: 'ID', width: 40 },
                {
                    field: 'season_id',
                    headerName: 'Season',
                    width: 75,
                    renderCell: (params) => (
                        <DataGetter id={params.value} type={tableType.SEASON} />
                    ),
                },
                { field: 'week', headerName: 'Week', width: 75 },
                { field: 'night', headerName: 'Night', width: 75 },
                {
                    field: 'date',
                    headerName: 'Date',
                    width: 100,
                    valueGetter: (params) => convertDate(params.value),
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
            break;

        case tableType.TEAM:
            columns = [
                { field: 'id', headerName: 'ID', width: 40 },
                {
                    field: 'cover_pic',
                    headerName: 'Pic',
                    width: 60,
                    renderCell: (params) => <Avatar src={params.value} />,
                },
                {
                    field: 'celeb_id',
                    headerName: 'Celeb',
                    width: 100,
                    renderCell: (params) => (
                        <DataGetter id={params.value} type={tableType.CELEB} />
                    ),
                },
                {
                    field: 'pro_id',
                    headerName: 'Pro',
                    width: 100,
                    renderCell: (params) => (
                        <DataGetter id={params.value} type={tableType.PRO} />
                    ),
                },
                {
                    field: 'mentor_id',
                    headerName: 'Mentor',
                    width: 100,
                    renderCell: (params) => (
                        <DataGetter id={params.value} type={tableType.PRO} />
                    ),
                },
                {
                    field: 'season_id',
                    headerName: 'Season',
                    width: 75,
                    renderCell: (params) => (
                        <DataGetter id={params.value} type={tableType.SEASON} />
                    ),
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
            ];
            break;

        case tableType.DANCE:
            columns = [
                { field: 'id', headerName: 'ID', width: 40 },
                {
                    field: 'episode_id',
                    headerName: 'Episode',
                    width: 100,
                    renderCell: (params) => (
                        <DataGetter
                            id={params.value}
                            type={tableType.EPISODE}
                        />
                    ),
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
            ];
            break;

        case tableType.JUDGE:
            columns = [
                { field: 'id', headerName: 'ID', width: 40 },
                { field: 'first_name', headerName: 'First Name', width: 100 },
                { field: 'last_name', headerName: 'Last Name', width: 100 },
                {
                    field: 'birthday',
                    headerName: 'Birthday',
                    width: 100,
                    valueGetter: (params) => convertDate(params.value),
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
            break;

        case tableType.SCORE:
            columns = [
                { field: 'id', headerName: 'ID', width: 40 },
                {
                    field: 'dance_id',
                    headerName: 'Dance',
                    width: 450,
                    renderCell: (params) => (
                        <DataGetter id={params.value} type={tableType.DANCE} />
                    ),
                },
                {
                    field: 'judge_id',
                    headerName: 'Judge',
                    width: 150,
                    renderCell: (params) => (
                        <DataGetter id={params.value} type={tableType.JUDGE} />
                    ),
                },
                { field: 'value', headerName: 'Value', width: 100 },
                { field: 'order', headerName: 'Order', width: 100 },
                {
                    field: 'is_guest',
                    headerName: 'Guest?',
                    width: 100,
                    renderCell: (params) => (params.value ? 'Yes' : 'No'),
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
            break;

        case tableType.DANCER:
            columns = [
                { field: 'id', headerName: 'ID', width: 40 },
                {
                    field: 'dance_id',
                    headerName: 'Dance',
                    width: 450,
                    renderCell: (params) => (
                        <DataGetter id={params.value} type={tableType.DANCE} />
                    ),
                },
                {
                    field: 'team_id',
                    headerName: 'Team',
                    width: 100,
                    renderCell: (params) => (
                        <DataGetter id={params.value} type={tableType.TEAM} />
                    ),
                },
                {
                    field: 'pro_id',
                    headerName: 'Pro',
                    width: 100,
                    renderCell: (params) => (
                        <DataGetter id={params.value} type={tableType.PRO} />
                    ),
                },
                {
                    field: 'celeb_id',
                    headerName: 'Celeb',
                    width: 100,
                    renderCell: (params) => (
                        <DataGetter id={params.value} type={tableType.CELEB} />
                    ),
                },
                {
                    field: 'is_background',
                    headerName: 'Background?',
                    width: 100,
                    renderCell: (params) => (params.value ? 'Yes' : 'No'),
                },
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
            ];
            break;

        case tableType.TOUR:
            columns = [
                { field: 'id', headerName: 'ID', width: 40 },
                {
                    field: 'cover_pic',
                    headerName: 'Pic',
                    width: 60,
                    renderCell: (params) => <Avatar src={params.value} />,
                },
                { field: 'name', headerName: 'Name', width: 200 },
                { field: 'season_id', headerName: 'Season', width: 100 },
                {
                    field: 'first_show',
                    headerName: 'First Show',
                    width: 100,
                    valueGetter: (params) => convertDate(params.value),
                },
                {
                    field: 'last_show',
                    headerName: 'Last Show',
                    width: 100,
                    valueGetter: (params) => convertDate(params.value),
                },
                { field: 'num_shows', headerName: '# Shows', width: 90 },
                { field: 'extra', headerName: 'Extra', width: 100 },
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
            break;

        case tableType.TOURCAST:
            columns = [
                { field: 'id', headerName: 'ID', width: 40 },
                {
                    field: 'tour_id',
                    headerName: 'Tour',
                    width: 250,
                    renderCell: (params) => (
                        <DataGetter id={params.value} type={tableType.TOUR} />
                    ),
                },
                { field: 'season_id', headerName: 'Season', width: 100 },
                {
                    field: 'pro_id',
                    headerName: 'Pro',
                    width: 150,
                    renderCell: (params) => (
                        <DataGetter id={params.value} type={tableType.PRO} />
                    ),
                },
                {
                    field: 'celeb_id',
                    headerName: 'Celeb',
                    width: 150,
                    renderCell: (params) => (
                        <DataGetter id={params.value} type={tableType.CELEB} />
                    ),
                },
                {
                    field: 'is_swing',
                    headerName: 'Swing?',
                    width: 75,
                    renderCell: (params) => (params.value ? 'Yes' : 'No'),
                },
                { field: 'extra', headerName: 'Extra', width: 100 },
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
            break;

        case tableType.USER:
            columns = [
                { field: 'id', headerName: 'ID', width: 40 },
                {
                    field: 'cover_pic',
                    headerName: 'Pic',
                    width: 60,
                    renderCell: (params) => <Avatar src={params.value} />,
                },
                { field: 'username', headerName: 'Username', width: 100 },
                { field: 'email', headerName: 'Email', width: 100 },
                {
                    field: 'email_verified',
                    headerName: 'Email Verified?',
                    width: 80,
                    renderCell: (params) => (params.value ? 'Yes' : 'No'),
                },
                { field: 'nickname', headerName: 'Nickname', width: 80 },
                {
                    field: 'watching_since',
                    headerName: 'Watching Since',
                    width: 80,
                    renderCell: (params) => (
                        <DataGetter id={params.value} type={tableType.SEASON} />
                    ),
                },
                { field: 'twitter', headerName: 'Twitter', width: 100 },
                { field: 'instagram', headerName: 'Instagram', width: 100 },
                { field: 'tiktok', headerName: 'TikTok', width: 100 },
                {
                    field: 'birthday',
                    headerName: 'Birthday',
                    width: 100,
                    valueGetter: (params) => convertDate(params.value),
                },
                { field: 'user_role', headerName: 'Role', width: 80 },
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
            break;

        default:
            columns = [];
    }

    const [pageSize, setPageSize] = React.useState(10);

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <Box sx={{ height: 700, minWidth: '100%' }}>
                <Stack direction="row" justifyContent="space-between" mb={2}>
                    <Typography variant="h4">{table}s Table</Typography>
                    <AddDialog table={table} />
                </Stack>

                <DataGrid
                    rows={items}
                    columns={columns}
                    loading={loading}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[10, 25, 50]}
                    pagination
                />
                {/* <DataGridContainer>
                            <DataGrid
                                rows={items}
                                columns={columns}
                                loading={loading}
                                //checkboxSelection
                            />
                        </DataGridContainer> */}

                {open.edit && (
                    <EditDialog
                        item={item}
                        table={table}
                        open={open.edit}
                        handleClose={handleClose}
                    />
                )}

                {open.delete && (
                    <DeleteDialog
                        item={item}
                        table={table}
                        open={open.delete}
                        handleClose={handleClose}
                        confirmDelete={confirmDelete}
                    />
                )}
            </Box>
        </LocalizationProvider>
    );
}

export default Table;
