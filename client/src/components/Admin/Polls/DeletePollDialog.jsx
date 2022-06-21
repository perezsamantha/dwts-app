import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
} from '@mui/material';

function DeletePollDialog(props) {
    const open = props.open;

    return (
        <Dialog open={open} onClose={props.handleClose}>
            <DialogTitle>{'Confirm Deletion'}</DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this poll?
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={props.handleClose} color="error">
                    Cancel
                </Button>
                <Button onClick={props.confirmDelete}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeletePollDialog;
