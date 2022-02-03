import React, { useEffect, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, TextField, Avatar } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';

import * as tableType from '../../constants/tableTypes';
import { genders, placements } from '../../constants/dropdowns';
import CoverPicUpload from '../shared/CoverPicUpload';
import { PhotoContainer } from '../shared/shared';
import { fetchCelebs, setCelebPic, updateCeleb } from '../../actions/celebs';
import { fetchPros, setProPic, updatePro } from '../../actions/pros';
import { setTeamPic, updateTeam } from '../../actions/teams';

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

    const loading = useSelector(state => {
        switch (table) {
            case 'Celeb':
                return state.loading.CELEBFIND;
            case 'Pro':
                return state.loading.PROFIND;
            case tableType.TEAM:
                return state.loading.TEAMFIND;
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
                    case tableType.TEAM:
                        dispatch(setTeamPic(id, data));
                        break
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
            case tableType.TEAM:
                dispatch(updateTeam(id, formData));
                break
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

                        {Array.of('Celeb', 'Pro', tableType.TEAM).includes(table) &&
                            <PhotoContainer>
                                <Avatar sx={{ width: 150, height: 150 }} src={formData?.cover_pic} />

                                <CoverPicUpload
                                    editor={editor}
                                    setEditor={setEditor}
                                    fileData={fileData}
                                    setFileData={setFileData}
                                />
                            </PhotoContainer>
                        }

                        {Array.of('Celeb', 'Pro').includes(table) &&
                            <TextField
                                margin="dense"
                                name="first_name"
                                label="First Name"
                                type="text"
                                value={formData?.first_name}
                                onChange={handleChange}
                            />
                        }

                        {Array.of('Celeb', 'Pro').includes(table) &&
                            <TextField
                                margin="dense"
                                name="last_name"
                                label="Last Name"
                                type="text"
                                value={formData?.last_name}
                                onChange={handleChange}
                            />
                        }

                        {Array.of(tableType.TEAM).includes(table) &&
                            <TextField
                                margin="dense"
                                name="celeb_id"
                                label="Celeb"
                                type="text"
                                select
                                value={formData?.celeb_id}
                                onChange={handleChange}
                            >
                                {celebs.map((celeb, index) => (
                                    <MenuItem key={index} value={celeb.id}>{celeb.first_name} {celeb?.last_name}</MenuItem>
                                ))}
                            </TextField>
                        }

                        {Array.of(tableType.TEAM).includes(table) &&
                            <TextField
                                margin="dense"
                                name="pro_id"
                                label="Pro"
                                type="text"
                                select
                                value={formData?.pro_id}
                                onChange={handleChange}
                            >
                                {pros.map((pro, index) => (
                                    <MenuItem key={index} value={pro.id}>{pro.first_name} {pro?.last_name}</MenuItem>
                                ))}
                            </TextField>
                        }

                        {Array.of(tableType.TEAM).includes(table) &&
                            <TextField
                                margin="dense"
                                name="mentor_id"
                                label="Mentor"
                                type="text"
                                select
                                value={formData?.mentor_id}
                                onChange={handleChange}
                            >
                                {pros.map((pro, index) => (
                                    <MenuItem key={index} value={pro.id}>{pro.first_name} {pro?.last_name}</MenuItem>
                                ))}
                            </TextField>
                        }

                        {Array.of(tableType.TEAM).includes(table) &&
                            <TextField
                                margin="dense"
                                name="season_id"
                                label="Season"
                                type="text"
                                value={formData?.season_id}
                                onChange={handleChange}
                            />
                        }

                        {Array.of(tableType.TEAM).includes(table) &&
                            <TextField
                                margin="dense"
                                name="placement"
                                label="Placement"
                                type="text"
                                select
                                value={formData?.placement}
                                onChange={handleChange}
                            >
                                {placements.map((placement, index) => (
                                    <MenuItem key={index} value={placement}>{placement}</MenuItem>
                                ))}
                            </TextField>
                        }

                        {Array.of(tableType.TEAM).includes(table) &&
                            <TextField
                                margin="dense"
                                name="team_name"
                                label="Team Name"
                                type="text"
                                value={formData?.team_name}
                                onChange={handleChange}
                            />
                        }

                        {Array.of(tableType.TEAM).includes(table) &&
                            <TextField
                                margin="dense"
                                name="extra"
                                label="Extra"
                                type="text"
                                value={formData?.extra}
                                onChange={handleChange}
                            />
                        }

                        {Array.of('Celeb', 'Pro').includes(table) &&
                            <MobileDatePicker
                                margin="dense"
                                label="Birthday"
                                inputFormat="MM/dd/yyyy"
                                value={formData?.birthday}
                                onChange={handleBirthday}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        }

                        {Array.of('Celeb', 'Pro').includes(table) &&
                            <TextField
                                margin="dense"
                                name="height"
                                label="Height (_'__)"
                                type="text"
                                value={formData?.height}
                                onChange={handleChange}
                            />}

                        {Array.of('Celeb', 'Pro').includes(table) &&
                            <TextField
                                margin="dense"
                                name="gender"
                                label="Gender"
                                type="text"
                                select
                                value={formData?.gender}
                                onChange={handleChange}
                            >
                                {genders.map((gender, index) => (
                                    <MenuItem key={index} value={gender}>{gender}</MenuItem>
                                ))}
                            </TextField>
                        }

                        {Array.of('Celeb', 'Pro').includes(table) &&
                            <TextField
                                margin="dense"
                                name="instagram"
                                label="Instagram Username"
                                type="text"
                                value={formData?.instagram}
                                onChange={handleChange}
                            />
                        }

                        {Array.of('Celeb', 'Pro').includes(table) &&
                            <TextField
                                margin="dense"
                                name="twitter"
                                label="Twitter Username"
                                type="text"
                                value={formData?.twitter}
                                onChange={handleChange}
                            />
                        }

                        {Array.of('Celeb', 'Pro').includes(table) &&
                            <TextField
                                margin="dense"
                                name="tiktok"
                                label="TikTok Username"
                                type="text"
                                value={formData?.tiktok}
                                onChange={handleChange}
                            />
                        }

                        {Array.of('Celeb', 'Pro').includes(table) &&
                            <TextField
                                margin="dense"
                                name="is_junior"
                                select
                                label="Junior?"
                                value={formData?.is_junior}
                                onChange={handleChange}
                            >
                                <MenuItem key={1} value={true}>Yes</MenuItem>
                                <MenuItem key={2} value={false}>No</MenuItem>
                            </TextField>
                        }

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