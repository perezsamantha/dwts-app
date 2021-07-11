import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Button, InputAdornment, IconButton } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

function TeamSettings() {
    const initialState = { username: 'username', name: 'name' };
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button color="primary" onClick={handleOpen}>
                <SettingsIcon />
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle>Profile Settings</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        testing
                    </DialogContentText>
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Update Profile
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default TeamSettings;