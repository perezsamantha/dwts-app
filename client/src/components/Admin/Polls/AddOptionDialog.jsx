import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initialPollState } from '../../../reducers/initialState';
import { addPollOption } from '../../../actions/polls';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';

function AddOptionDialog(props) {
    const [open, setOpen] = useState(props.open);
    const dispatch = useDispatch();

    const initialState = () => {
        return initialPollState.option;
    };

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        setFormData({ poll_id: props.id, data: initialState.data });
        setOpen(props.open);
    }, [props]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value === '' ? null : e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(addPollOption(formData));

        setFormData(initialState);
        props.handleClose();
    };

    return (
        <Dialog
            fullWidth
            maxWidth={'lg'}
            open={open}
            onClose={props.handleClose}
        >
            <DialogTitle>Add Option</DialogTitle>
            <DialogContent>
                <TextField
                    name="data"
                    label="Data"
                    type="text"
                    required
                    value={formData.data || ''}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddOptionDialog;
