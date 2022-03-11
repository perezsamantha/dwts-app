import React, { useEffect, useState } from 'react';
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
import { setUserPic, updateUser } from '../../actions/auth';
import DialogFields from '../Admin/DialogFields';

function EditAccount(props) {
    const [open, setOpen] = useState(props.open);
    const [formData, setFormData] = useState(props.user);
    console.log(formData);
    const [fileData, setFileData] = useState(null);
    const [editor, setEditor] = useState(null);
    const dispatch = useDispatch();
    const id = props.user.id;

    useEffect(() => {
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

                dispatch(setUserPic(id, data));
            });
        }

        dispatch(updateUser(id, formData));
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
                <DialogTitle>Account Settings</DialogTitle>
                <DialogContent>
                    <DialogFields
                        formData={formData}
                        table={tableType.AUTH}
                        handleChange={handleChange}
                        handleBirthday={handleBirthday}
                        handleDate={handleDate}
                        editor={editor}
                        setEditor={setEditor}
                        fileData={fileData}
                        setFileData={setFileData}
                        dialog={'Edit'}
                    />

                    {/* TODO: delete account button with confirmation dialog */}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={props.handleClose}
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

export default EditAccount;
