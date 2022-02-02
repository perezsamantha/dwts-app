import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button } from '@mui/material';

function DeleteDialog(props) {
    const item = props.item;
    const table = props.table;
    const open = props.open;

    return (
        <Dialog
            open={open}
            onClose={props.handleClose}
        >
            <DialogTitle>
                {"Confirm Deletion"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete {item} from the {table}s table?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} variant="contained" color="error">
                    CANCEL
                </Button>
                <Button onClick={props.confirmDelete} variant="contained" color="primary">
                    DELETE
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog;