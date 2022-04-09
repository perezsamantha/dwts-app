import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { setCelebPic, updateCeleb } from '../../actions/celebs';
import { setProPic, updatePro } from '../../actions/pros';
import { setTeamPic, updateTeam } from '../../actions/teams';
import DialogFields from './DialogFields';
import { setSeasonPic, updateSeason } from '../../actions/seasons';
import { updateJudge } from '../../actions/judges';
import { updateEpisode } from '../../actions/episodes';
import { updateDance } from '../../actions/dances';
import { updateScore } from '../../actions/scores';
import { updateDancer } from '../../actions/dancers';
import { updateTour, updateTourCast, setTourPic } from '../../actions/tours';
import { setUserPic, updateUser } from '../../actions/users';
import Progress from '../shared/Progress';

function EditDialog(props) {
    const [open, setOpen] = useState(props.open);
    const [formData, setFormData] = useState(props.item);
    const [fileData, setFileData] = useState(null);
    const [editor, setEditor] = useState(null);
    const dispatch = useDispatch();
    const id = props.item?.id;
    const table = props.table;

    const loading = useSelector((state) => {
        switch (table) {
            case tableType.CELEB:
                return state.loading.CELEBFIND;
            case tableType.PRO:
                return state.loading.PROFIND;
            case tableType.SEASON:
                return state.loading.SEASONFIND;
            case tableType.EPISODE:
                return state.loading.EPISODEFIND;
            case tableType.TEAM:
                return state.loading.TEAMFIND;
            case tableType.DANCE:
                return state.loading.DANCEFIND;
            case tableType.JUDGE:
                return state.loading.JUDGEFIND;
            case tableType.SCORE:
                return state.loading.SCOREFIND;
            case tableType.DANCER:
                return state.loading.DANCERFIND;
            case tableType.TOUR:
                return state.loading.TOURFIND;
            case tableType.TOURCAST:
                return state.loading.TOURCASTFIND;
            case tableType.USER:
                return state.loading.USERFIND;
            default:
        }
    });

    useEffect(() => {
        setFormData(props.item);
        setOpen(props.open);
    }, [props]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleBirthday = (date) => {
        setFormData({ ...formData, birthday: date });
    };

    const handleDate = (date) => {
        setFormData({ ...formData, date: date });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editor != null) {
            const data = new FormData();

            const canvas = editor.getImageScaledToCanvas();

            canvas.toBlob(function (blob) {
                data.append(
                    'cover_pic',
                    blob,
                    `${Date.now()}-${fileData.name}`
                );

                switch (table) {
                    case tableType.CELEB:
                        dispatch(setCelebPic(id, data));
                        break;
                    case tableType.PRO:
                        dispatch(setProPic(id, data));
                        break;
                    case tableType.SEASON:
                        dispatch(setSeasonPic(id, data));
                        break;
                    case tableType.TEAM:
                        dispatch(setTeamPic(id, data));
                        break;
                    case tableType.TOUR:
                        dispatch(setTourPic(id, data));
                        break;
                    case tableType.USER:
                        dispatch(setUserPic(id, data));
                        break;
                    default:
                }
            });
        }

        switch (table) {
            case tableType.CELEB:
                dispatch(updateCeleb(id, formData));
                break;
            case tableType.PRO:
                dispatch(updatePro(id, formData));
                break;
            case tableType.SEASON:
                dispatch(updateSeason(id, formData));
                break;
            case tableType.EPISODE:
                dispatch(updateEpisode(id, formData));
                break;
            case tableType.TEAM:
                dispatch(updateTeam(id, formData));
                break;
            case tableType.DANCE:
                dispatch(updateDance(id, formData));
                break;
            case tableType.JUDGE:
                dispatch(updateJudge(id, formData));
                break;
            case tableType.SCORE:
                dispatch(updateScore(id, formData));
                break;
            case tableType.DANCER:
                dispatch(updateDancer(id, formData));
                break;
            case tableType.TOUR:
                dispatch(updateTour(id, formData));
                break;
            case tableType.TOURCAST:
                dispatch(updateTourCast(id, formData));
                break;
            case tableType.USER:
                dispatch(updateUser(id, formData));
                break;
            default:
        }
        props.handleClose();
    };

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <Dialog
                fullWidth
                maxWidth={'lg'}
                open={open}
                onClose={props.handleClose}
            >
                <DialogTitle>Update {table}</DialogTitle>

                {loading ? (
                    <Progress />
                ) : (
                    <DialogContent>
                        <DialogFields
                            formData={formData}
                            setFormData={setFormData}
                            table={table}
                            handleChange={handleChange}
                            handleBirthday={handleBirthday}
                            handleDate={handleDate}
                            editor={editor}
                            setEditor={setEditor}
                            fileData={fileData}
                            setFileData={setFileData}
                            dialog={'Edit'}
                        />
                    </DialogContent>
                )}

                <DialogActions>
                    <Button onClick={props.handleClose} color="error">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Update {table}
                    </Button>
                </DialogActions>
            </Dialog>
        </LocalizationProvider>
    );
}

export default EditDialog;
