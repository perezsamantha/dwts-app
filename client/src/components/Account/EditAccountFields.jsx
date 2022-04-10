import React, { useEffect, useState } from 'react';
import {
    MenuItem,
    TextField,
    Avatar,
    Button,
    DialogActions,
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
} from '@mui/material';
import { LocalizationProvider } from '@mui/lab';

import CoverPicUpload from '../shared/CoverPicUpload';
import { PhotoContainer } from '../shared/regStyles';
import { useDispatch } from 'react-redux';
import { setUserPic, updateUser } from '../../actions/auth';
import DateAdapter from '@mui/lab/AdapterDateFns';
import {
    days,
    monthNames,
    months,
    seasonNumbers,
} from '../../constants/dropdowns';
import { convertPlacement } from '../shared/functions';

function EditAccountFields(props) {
    const [formData, setFormData] = useState(props.user);
    const [fileData, setFileData] = useState(null);
    const [editor, setEditor] = useState(null);
    const id = props.user?.id;
    const dispatch = useDispatch();

    useEffect(() => {
        setFormData(props.user);
    }, [props]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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

        props.close();
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

                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                    >
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

                        <TextField
                            margin="dense"
                            name="birthday_month"
                            //label="Birthday Month"
                            type="text"
                            select
                            value={formData.birthday_month || ''}
                            onChange={handleChange}
                            helperText="Birthday Month"
                        >
                            {months.map((month, index) => (
                                <MenuItem key={index} value={month}>
                                    {monthNames[month - 1]}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            margin="dense"
                            name="birthday_day"
                            //label="Birthday Day"
                            type="text"
                            select
                            value={formData.birthday_day || ''}
                            onChange={handleChange}
                            helperText="Birthday Day"
                        >
                            {days.map((day, index) => (
                                <MenuItem key={index} value={day}>
                                    {convertPlacement(day)}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            margin="dense"
                            name="watching_since"
                            //label="Watching Since"
                            type="text"
                            select
                            value={formData.watching_since || ''}
                            onChange={handleChange}
                            helperText="Watching Since"
                        >
                            {seasonNumbers.map((season, index) => {
                                return (
                                    <MenuItem key={index} value={season}>
                                        Season {season}
                                    </MenuItem>
                                );
                            })}
                        </TextField>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.close} color="error">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit}>Update</Button>
                </DialogActions>
            </Dialog>
        </LocalizationProvider>
    );
}

export default EditAccountFields;
