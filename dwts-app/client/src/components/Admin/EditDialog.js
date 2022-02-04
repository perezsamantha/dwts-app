import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';

import * as tableType from '../../constants/tableTypes';
import { setCelebPic, updateCeleb } from '../../actions/celebs';
import { setProPic, updatePro } from '../../actions/pros';
import { setTeamPic, updateTeam } from '../../actions/teams';
import DialogFields from './DialogFields';
import { setSeasonPic, updateSeason } from '../../actions/seasons';
import { updateJudge } from '../../actions/judges';

function EditDialog(props) {

    const [open, setOpen] = useState(props.open);
    const [formData, setFormData] = useState(props.item);
    const [fileData, setFileData] = useState(null);
    const [editor, setEditor] = useState(null);
    const dispatch = useDispatch();
    const id = props.item?.id;
    const table = props.table;
    const celebs = props.celebs;
    const pros = props.pros;
    const seasons = props.seasons;

    const loading = useSelector(state => {
        switch (table) {
            case 'Celeb':
                return state.loading.CELEBFIND;
            case 'Pro':
                return state.loading.PROFIND;
            case tableType.SEASON:
                return state.loading.SEASONFIND;
            case tableType.TEAM:
                return state.loading.TEAMFIND;
            // case tableType.DANCE:
            //     return state.loading.DANCEFIND;
            case tableType.JUDGE:
                return state.loading.JUDGEFIND;
            // case tableType.SCORE:
            //     return state.loading.SCOREFIND;
            // case tableType.USER:
            //     return state.loading.USERFIND;
        }
    })

    useEffect(() => {
        setFormData(props.item);
        setOpen(props.open);
    }, [props]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleBirthday = (date) => {
        setFormData({ ...formData, birthday: date })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editor != null) {
            const data = new FormData();

            const canvas = editor.getImageScaledToCanvas();

            canvas.toBlob(function (blob) {
                data.append("cover_pic", blob, `${Date.now()}-${fileData.name}`);

                switch (table) {
                    case 'Celeb':
                        dispatch(setCelebPic(id, data));
                        break
                    case 'Pro':
                        dispatch(setProPic(id, data));
                        break
                    case tableType.SEASON:
                        dispatch(setSeasonPic(id, data));
                        break
                    case tableType.TEAM:
                        dispatch(setTeamPic(id, data));
                        break
                    // case tableType.DANCE:
                    //     dispatch();
                    //     break
                    // case tableType.USER:
                    //     dispatch();
                    //     break
                    // not judge, score ?
                    default:
                    //console.log('Invald table type');
                }
            })
        }

        switch (table) {
            case 'Celeb':
                dispatch(updateCeleb(id, formData));
                break
            case 'Pro':
                dispatch(updatePro(id, formData));
                break
            case tableType.SEASON:
                dispatch(updateSeason(id, formData));
                break
            case tableType.TEAM:
                dispatch(updateTeam(id, formData));
                break
            // case tableType.DANCE:
            //     dispatch();
            //     break
            case tableType.JUDGE:
                dispatch(updateJudge(id, formData));
                break
            // case tableType.SCORE:
            //     dispatch();
            //     break
            // case tableType.USER:
            //     dispatch();
            //     break
            default:
            //console.log('Invald table type');
        }
        props.handleClose();
    };

    return (
        loading ? <div>loading bar (move)</div> : <div>
            <LocalizationProvider dateAdapter={DateAdapter}>
                {<Dialog fullWidth maxWidth={'lg'} open={open} onClose={props.handleClose} >
                    <DialogTitle>Update {table}</DialogTitle>
                    <DialogContent >

                        <DialogFields
                            formData={formData}
                            table={table}
                            handleChange={handleChange}
                            handleBirthday={handleBirthday}
                            celebs={celebs}
                            pros={pros}
                            seasons={seasons}
                            editor={editor}
                            setEditor={setEditor}
                            fileData={fileData}
                            setFileData={setFileData}
                            dialog={'Edit'}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.handleClose} variant="contained" color="error">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} variant="contained" color="primary">
                            Update {table}
                        </Button>
                    </DialogActions>
                </Dialog>}
            </LocalizationProvider>
        </div>
    )
}

export default EditDialog;