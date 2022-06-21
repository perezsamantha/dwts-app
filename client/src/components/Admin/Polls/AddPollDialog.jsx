import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { initialPollState } from '../../../reducers/initialState';
import { addPoll } from '../../../actions/polls';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import { pollDays } from '../../../constants/dropdowns';

function AddPollDialog() {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const initialState = () => {
        return initialPollState.poll;
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value === '' ? null : e.target.value,
        });
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(addPoll(formData));

        setFormData(initialState);
        handleClose();
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleOpen}>
                <AddIcon />
            </Button>
            <Dialog fullWidth maxWidth={'lg'} open={open} onClose={handleClose}>
                <DialogTitle>Create Poll</DialogTitle>
                <DialogContent>
                    <TextField
                        name="title"
                        label="Title"
                        type="text"
                        required
                        value={formData.title || ''}
                        onChange={handleChange}
                    />

                    <TextField
                        name="expires_in"
                        label="Expires In"
                        type="text"
                        required
                        select
                        value={formData.expires_in || ''}
                        onChange={handleChange}
                    >
                        {pollDays.map((day, index) => (
                            <MenuItem key={index} value={day}>
                                {day} days
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddPollDialog;
