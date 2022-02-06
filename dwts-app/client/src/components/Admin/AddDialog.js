import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

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

function AddDialog(props) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const table = props.table;
    const celebs = props.celebs;
    const pros = props.pros;
    const seasons = props.seasons;
    const episodes = props.episodes;
    const judges = props.judges;

    const initialState = () => {
        switch (table) {
            case 'Celeb':
            case 'Pro':
                return {
                    cover_pic: null,
                    first_name: null,
                    last_name: null,
                    birthday: new Date().toISOString(),
                    //birthday: null,
                    height: null,
                    gender: null,
                    twitter: null,
                    instagram: null,
                    tiktok: null,
                    is_junior: false
                }
            case tableType.SEASON:
                return {
                    cover_pic: null,
                    number: null,
                    extra: null
                }
            case tableType.EPISODE:
                return {
                    season_id: null,
                    week: null,
                    night: null,
                    date: new Date().toISOString()
                }
            case tableType.TEAM:
                return {
                    cover_pic: null,
                    celeb_id: null,
                    pro_id: null,
                    mentor_id: null,
                    season_id: null,
                    placement: null,
                    team_name: null,
                    extra: null
                }
            case tableType.DANCE:
                return {
                    episode_id: null,
                    style: null,
                    theme: null,
                    running_order: null,
                    song_title: null,
                    song_artist: null,
                    link: null,
                    extra: null
                }
            case tableType.JUDGE:
                return {
                    first_name: null,
                    last_name: null,
                    birthday: new Date().toISOString(),
                }
            case tableType.SCORE:
                return {
                    dance_id: null,
                    judge_id: null,
                    value: null,
                    order: null,
                    is_guest: false
                }
        }
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleBirthday = (date) => {
        setFormData({ ...formData, birthday: date })
    }

    const handleDate = (date) => {
        setFormData({ ...formData, date: date })
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        switch (table) {
            case 'Celeb':
                dispatch(addCeleb(formData));
                break
            case 'Pro':
                dispatch(addPro(formData));
                break
            case tableType.SEASON:
                dispatch(addSeason(formData));
                break
            case tableType.EPISODE:
                dispatch(addEpisode(formData));
                break
            case tableType.TEAM:
                dispatch(addTeam(formData));
                break
            case tableType.DANCE:
                dispatch(addDance(formData));
                break
            case tableType.JUDGE:
                dispatch(addJudge(formData));
                break
            case tableType.SCORE:
                dispatch(addScore(formData));
                break
            // case tableType.USER:
            //     dispatch();
            //     break
            default:
            //console.log('Invald table type');
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
                <Button variant="contained" disableRipple onClick={handleOpen}>
                    Add {table}
                </Button>
                <Dialog fullWidth maxWidth={'lg'} open={open} onClose={handleClose} >
                    <DialogTitle>Add {table}</DialogTitle>
                    <DialogContent >

                        <DialogFields
                            formData={formData}
                            table={table}
                            handleChange={handleChange}
                            handleBirthday={handleBirthday}
                            handleDate={handleDate}
                            celebs={celebs}
                            pros={pros}
                            seasons={seasons}
                            episodes={episodes}
                            judges={judges}
                        // editor={editor}
                        // setEditor={setEditor}
                        // fileData={fileData}
                        // setFileData={setFileData}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant="contained" color="error">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} variant="contained" color="primary">
                            Add {table}
                        </Button>
                    </DialogActions>
                </Dialog>
            </LocalizationProvider>
        </div>
    )
}

export default AddDialog;