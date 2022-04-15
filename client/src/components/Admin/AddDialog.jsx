import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';

import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';

import * as tableType from '../../constants/tableTypes';
import DialogFields from './DialogFields';
import { addCeleb } from '../../actions/celebs';
import { addPro } from '../../actions/pros';
import { addTeam } from '../../actions/teams';
import { addSeason } from '../../actions/seasons';
import { addJudge } from '../../actions/judges';
import { addEpisode } from '../../actions/episodes';
import { addDance } from '../../actions/dances';
import { addScore } from '../../actions/scores';
import { addDancer } from '../../actions/dancers';
import { addTour, addTourCast } from '../../actions/tours';
import { addUser } from '../../actions/users';
import {
    initialCelebState,
    initialDancerState,
    initialDanceState,
    initialEpisodeState,
    initialJudgeState,
    initialProState,
    initialScoreState,
    initialSeasonState,
    initialTeamState,
    initialTourState,
    initialUserState,
} from '../../reducers/initialState';
import AddIcon from '@mui/icons-material/Add';

function AddDialog(props) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const table = props.table;

    const initialState = () => {
        switch (table) {
            case tableType.CELEB:
                return initialCelebState.celeb;
            case tableType.PRO:
                return initialProState.pro;
            case tableType.SEASON:
                return initialSeasonState.season;
            case tableType.TEAM:
                return initialTeamState.team;
            case tableType.EPISODE:
                return initialEpisodeState.episode;
            case tableType.DANCE:
                return initialDanceState.dance;
            case tableType.JUDGE:
                return initialJudgeState.judge;
            case tableType.SCORE:
                return initialScoreState.score;
            case tableType.DANCER:
                return initialDancerState.dancer;
            case tableType.TOUR:
                return initialTourState.tour;
            case tableType.TOURCAST:
                return initialTourState.castMember;
            case tableType.USER:
                return initialUserState.user;
            default:
        }
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleBirthday = (date) => {
        setFormData({ ...formData, birthday: date });
    };

    const handleDate = (date) => {
        setFormData({ ...formData, date: date });
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        switch (table) {
            case tableType.CELEB:
                dispatch(addCeleb(formData));
                break;
            case tableType.PRO:
                dispatch(addPro(formData));
                break;
            case tableType.SEASON:
                dispatch(addSeason(formData));
                break;
            case tableType.EPISODE:
                dispatch(addEpisode(formData));
                break;
            case tableType.TEAM:
                dispatch(addTeam(formData));
                break;
            case tableType.DANCE:
                dispatch(addDance(formData));
                break;
            case tableType.JUDGE:
                dispatch(addJudge(formData));
                break;
            case tableType.SCORE:
                dispatch(addScore(formData));
                break;
            case tableType.DANCER:
                dispatch(addDancer(formData));
                break;
            case tableType.TOUR:
                dispatch(addTour(formData));
                break;
            case tableType.TOURCAST:
                dispatch(addTourCast(formData));
                break;
            case tableType.USER:
                dispatch(addUser(formData));
                break;
            default:
        }
        setFormData(initialState);
        handleClose();
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <LocalizationProvider dateAdapter={DateAdapter}>
                <Button onClick={handleOpen}>
                    <AddIcon />
                </Button>
                <Dialog
                    fullWidth
                    maxWidth={'lg'}
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>Add {table}</DialogTitle>
                    <DialogContent>
                        <DialogFields
                            formData={formData}
                            setFormData={setFormData}
                            table={table}
                            handleChange={handleChange}
                            handleBirthday={handleBirthday}
                            handleDate={handleDate}
                            // editor={editor}
                            // setEditor={setEditor}
                            // fileData={fileData}
                            // setFileData={setFileData}
                            dialog={'Add'}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="error">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit}>Add</Button>
                    </DialogActions>
                </Dialog>
            </LocalizationProvider>
        </div>
    );
}

export default AddDialog;
