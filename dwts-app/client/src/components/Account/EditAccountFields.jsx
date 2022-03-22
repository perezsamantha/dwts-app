import React, { useEffect, useState } from 'react';
import {
    MenuItem,
    TextField,
    Avatar,
    InputAdornment,
    Box,
    Button,
    DialogActions,
    Dialog,
    DialogTitle,
    DialogContent,
} from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';

import CoverPicUpload from '../shared/CoverPicUpload';
import { PhotoContainer } from '../shared/regStyles';
import { useDispatch, useSelector } from 'react-redux';
import { setUserPic, updateUser } from '../../actions/auth';
import DateAdapter from '@mui/lab/AdapterDateFns';

function EditAccountFields(props) {
    const [formData, setFormData] = useState(props.user);
    const [fileData, setFileData] = useState(null);
    const [editor, setEditor] = useState(null);
    const id = props.user?.id;
    const dispatch = useDispatch();

    const seasons = useSelector((state) => state.seasons.seasons);

    useEffect(() => {
        setFormData(props.user);
    }, [props]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleBirthday = (date) => {
        setFormData({ ...formData, birthday: date });
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

                dispatch(setUserPic(id, data));
            });
        }

        dispatch(updateUser(id, formData));

        //props.handleClose();
    };

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <Dialog
                fullWidth
                maxWidth={'lg'}
                open={props.open}
                onClose={props.close}
            >
                <DialogTitle>Update Account</DialogTitle>
                <DialogContent>
                    <PhotoContainer>
                        <Avatar
                            sx={{ width: 150, height: 150 }}
                            src={formData?.cover_pic}
                        />

                        <CoverPicUpload
                            editor={editor}
                            setEditor={setEditor}
                            fileData={fileData}
                            setFileData={setFileData}
                        />
                    </PhotoContainer>

                    <TextField
                        margin="dense"
                        name="username"
                        label="Username"
                        type="text"
                        value={formData.username || ''}
                        onChange={handleChange}
                    />

                    <TextField
                        margin="dense"
                        name="email"
                        label="Email"
                        type="text"
                        value={formData.email || ''}
                        onChange={handleChange}
                    />

                    <TextField
                        margin="dense"
                        name="nickname"
                        label="Nickname"
                        type="text"
                        value={formData.nickname || ''}
                        onChange={handleChange}
                    />

                    <TextField
                        margin="dense"
                        name="watching_since"
                        label="Watching Since"
                        type="text"
                        select
                        value={formData.watching_since || ''}
                        onChange={handleChange}
                    >
                        {seasons.map((season, index) => {
                            return (
                                <MenuItem key={index} value={season.id}>
                                    {season.id}
                                </MenuItem>
                            );
                        })}
                    </TextField>

                    <TextField
                        margin="dense"
                        name="instagram"
                        label="Instagram Username"
                        type="text"
                        value={formData.instagram || ''}
                        onChange={handleChange}
                    />

                    <TextField
                        margin="dense"
                        name="twitter"
                        label="Twitter Username"
                        type="text"
                        value={formData.twitter || ''}
                        onChange={handleChange}
                    />

                    <TextField
                        margin="dense"
                        name="tiktok"
                        label="TikTok Username"
                        type="text"
                        value={formData.tiktok || ''}
                        onChange={handleChange}
                    />

                    <MobileDatePicker
                        margin="dense"
                        label="Birthday"
                        inputFormat="MM/dd/yyyy"
                        value={formData.birthday || null}
                        onChange={handleBirthday}
                        renderInput={(params) => <TextField {...params} />}
                    />

                    {/* <TextField
                        margin="dense"
                        name="password"
                        label="Password"
                        type="text"
                        value={formData.password || ''}
                        onChange={handleChange}
                    />

            <TextField
                        margin="dense"
                        name="confirm_password"
                        label="Confirm Password"
                        type="text"
                        value={formData.confirm_password || ''}
                        onChange={handleChange}
                    />
                */}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={props.close}
                        variant="contained"
                        color="error"
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} variant="contained">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </LocalizationProvider>
    );
}

export default EditAccountFields;
