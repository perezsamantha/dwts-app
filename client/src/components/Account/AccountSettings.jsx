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
    Stack,
    Box,
} from '@mui/material';
import CoverPicUpload from '../shared/CoverPicUpload';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthPic, updateAuth } from '../../actions/auth';
import {
    days,
    monthNames,
    months,
    seasonNumbers,
} from '../../constants/dropdowns';
import { convertPlacement } from '../shared/functions';
import DeleteDialog from './DeleteDialog';

function AccountSettings(props) {
    const user = useSelector((state) => state.auth.authData);
    const [formData, setFormData] = useState(user);
    const [fileData, setFileData] = useState(null);
    const [editor, setEditor] = useState(null);
    const dispatch = useDispatch();
    const [deleteOpen, setDeleteOpen] = useState(false);

    useEffect(() => {
        setFormData(user);
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value === '' ? null : e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.username || !formData.nickname) {
            return;
        }

        if (editor != null) {
            const data = new FormData();

            // const canvas = editor.getImageScaledToCanvas();
            const canvas = editor.getImage();

            canvas.toBlob(function (blob) {
                console.log(blob);
                data.append(
                    'cover_pic',
                    blob,
                    `${Date.now()}-${fileData.name}`
                );

                dispatch(setAuthPic(data));
            });
        }

        dispatch(updateAuth(formData));

        props.close();
    };

    const openDelete = () => {
        setDeleteOpen(true);
    };

    const closeDelete = () => {
        setDeleteOpen(false);
    };

    return (
        <Dialog
            fullWidth
            maxWidth={'lg'}
            open={props.open}
            onClose={props.close}
        >
            <DialogTitle>Account Settings</DialogTitle>
            <DialogContent>
                <Stack alignItems="center">
                    <Stack alignItems="center" spacing={1}>
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
                    </Stack>

                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <TextField
                            name="username"
                            label="Username"
                            type="text"
                            value={formData.username || ''}
                            onChange={handleChange}
                        />

                        <TextField
                            name="email"
                            label="Email"
                            type="text"
                            disabled
                            value={formData.email || ''}
                            onChange={handleChange}
                        />

                        <TextField
                            name="nickname"
                            label="Nickname"
                            type="text"
                            value={formData.nickname || ''}
                            onChange={handleChange}
                        />

                        <TextField
                            name="instagram"
                            label="Instagram Username"
                            type="text"
                            value={formData.instagram || ''}
                            onChange={handleChange}
                        />

                        <TextField
                            name="twitter"
                            label="Twitter Username"
                            type="text"
                            value={formData.twitter || ''}
                            onChange={handleChange}
                        />

                        <TextField
                            name="tiktok"
                            label="TikTok Username"
                            type="text"
                            value={formData.tiktok || ''}
                            onChange={handleChange}
                        />

                        <TextField
                            name="birthday_month"
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
                            name="birthday_day"
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
                            name="watching_since"
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

                    <Box mt={2}>
                        <Button
                            onClick={openDelete}
                            color="error"
                            variant="outlined"
                        >
                            Delete Account
                        </Button>
                    </Box>
                </Stack>

                {deleteOpen && (
                    <DeleteDialog open={deleteOpen} close={closeDelete} />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close}>Cancel</Button>
                <Button onClick={handleSubmit}>Update</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AccountSettings;
