import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, TextField, Slider, Avatar } from '@mui/material';

import { findCelebById, setCelebPic, updateCeleb } from '../../actions/celebs';
import { useDispatch, useSelector } from 'react-redux';
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { genders } from '../../constants/dropdowns';
import CoverPicUpload from '../shared/CoverPicUpload';
import { PhotoContainer } from '../shared/shared';

function CelebEdit(props) {

    const [open, setOpen] = useState(props.open);
    const loading = useSelector(state => state.loading.CELEBFIND);
    const [formData, setFormData] = useState(props.celeb);
    const id = props.celeb?.id;
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleBirthday = (date) => {
        setFormData({ ...formData, birthday: date })
    }

    const [fileData, setFileData] = useState(null);

    useEffect(() => {
        setFormData(props.celeb);
        setOpen(props.open);

    }, [props]);

    const [editor, setEditor] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editor != null) {
            const data = new FormData();

            const canvas = editor.getImageScaledToCanvas();

            canvas.toBlob(function (blob) {
                data.append("cover_pic", blob, `${Date.now()}-${fileData.name}`);
                dispatch(setCelebPic(id, data));
            })
        }

        dispatch(updateCeleb(id, formData));
        props.handleClose();
    };

    return (
        loading ? <div>loading bar</div> : <div>
            <LocalizationProvider dateAdapter={DateAdapter}>
                {<Dialog fullWidth maxWidth={'lg'} open={open} onClose={props.handleClose} >
                    <DialogTitle>Update Celeb</DialogTitle>
                    <DialogContent >

                        <PhotoContainer>
                        <Avatar sx={{ width: 150, height: 150 }} src={formData?.cover_pic} />

                        <CoverPicUpload
                            editor={editor}
                            setEditor={setEditor}
                            fileData={fileData}
                            setFileData={setFileData}
                        />
                        </PhotoContainer>

                        <TextField
                            margin="dense"
                            name="first_name"
                            label="First Name"
                            type="text"
                            value={formData?.first_name}
                            onChange={handleChange}
                        />

                        <TextField
                            margin="dense"
                            name="last_name"
                            label="Last Name"
                            type="text"
                            value={formData?.last_name}
                            onChange={handleChange}
                        />

                        <MobileDatePicker
                            margin="dense"
                            label="Birthday"
                            inputFormat="MM/dd/yyyy"
                            value={formData?.birthday}
                            onChange={handleBirthday}
                            renderInput={(params) => <TextField {...params} />}
                        />

                        <TextField
                            margin="dense"
                            name="height"
                            label="Height (_'__)"
                            type="text"
                            value={formData?.height}
                            onChange={handleChange}
                        />

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

                        <TextField
                            margin="dense"
                            name="instagram"
                            label="Instagram Username"
                            type="text"
                            value={formData?.instagram}
                            onChange={handleChange}
                        />

                        <TextField
                            margin="dense"
                            name="twitter"
                            label="Twitter Username"
                            type="text"
                            value={formData?.twitter}
                            onChange={handleChange}
                        />

                        <TextField
                            margin="dense"
                            name="tiktok"
                            label="TikTok Username"
                            type="text"
                            value={formData?.tiktok}
                            onChange={handleChange}
                        />

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

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.handleClose} variant="contained" color="error">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} variant="contained" color="primary">
                            Update Celeb
                        </Button>
                    </DialogActions>
                </Dialog>}
            </LocalizationProvider>
        </div>
    )
}

export default CelebEdit;