import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, TextField, Slider, Avatar } from '@mui/material';

import { setCelebPic, updateCeleb } from '../../actions/celebs';
import { useDispatch, useSelector } from 'react-redux';
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { genders } from '../../constants/dropdowns';
import CoverPicUpload from '../shared/CoverPicUpload';
import { PhotoContainer } from '../shared/shared';
import { setProPic, updatePro } from '../../actions/pros';

function EditDialog(props) {

    const [open, setOpen] = useState(props.open);
    const [formData, setFormData] = useState(props.item);
    const [fileData, setFileData] = useState(null);
    const [editor, setEditor] = useState(null);
    const dispatch = useDispatch();
    const id = props.item?.id;
    const table = props.table;

    const loading = useSelector(state => {
        switch (table) {
            case 'Celeb':
                return state.loading.CELEBFIND;
            case 'Pro':
                return state.loading.PROFIND;
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
                    case 'Pro':
                        dispatch(setProPic(id, data));
                    default:
                    //console.log('Invald table type');
                }
                //dispatch(setCelebPic(id, data));
            })
        }

        switch (table) {
            case 'Celeb':
                dispatch(updateCeleb(id, formData));
            case 'Pro':
                dispatch(updatePro(id, formData));
            default:
            //console.log('Invald table type');
        }
        //dispatch(updateCeleb(id, formData));
        props.handleClose();
    };

    return (
        loading ? <div>loading bar (move)</div> : <div>
            <LocalizationProvider dateAdapter={DateAdapter}>
                {<Dialog fullWidth maxWidth={'lg'} open={open} onClose={props.handleClose} >
                    <DialogTitle>Update {table}</DialogTitle>
                    <DialogContent >

                        {Array.of('Celeb', 'Pro').includes(table) &&
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