import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Button, InputAdornment, IconButton } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

function AccountSettings() {
    const initialState = { username: 'username', name: 'name' };
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [showPass, setShowPass] = useState(false);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    const handleOpen = () => {
        setOpen(true);
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    // }

    const handleClose = () => {
        setOpen(false);
    };

    const handleShowPass = () => setShowPass((prevShowPass) => !prevShowPass);

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
                    <TextField 
                        margin="dense"
                        id="username"
                        name="username"
                        label="username"
                        type="text"
                        fullWidth
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <TextField 
                        margin="dense"
                        id="name"
                        name="name"
                        label="name"
                        type="text"
                        fullWidth
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <TextField 
                        margin="dense"
                        id="pass" 
                        name="password" 
                        label="password"
                        type={showPass ? "text" : "password"} 
                        onChange={handleChange} 
                        handleShowPass={handleShowPass}
                        fullWidth
                        InputProps={{
                            endAdornment:
                            <InputAdornment position="end">
                                <IconButton onClick={handleShowPass}>
                                    {showPass ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }}
                    />
                    <TextField 
                        margin="dense"
                        id="confirmPass" 
                        name="confirmPassword" 
                        label="confirm password" 
                        type="password" 
                        onChange={handleChange} 
                        fullWidth
                    />
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

export default AccountSettings;