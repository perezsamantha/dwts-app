import React from 'react';
import { useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button } from '@mui/material';
import * as tableType from '../../constants/tableTypes';

function DeleteDialog(props) {
    const item = props.item;
    const table = props.table;
    const open = props.open;

    const loading = useSelector(state => {
        switch (table) {
            case 'Celeb':
                return state.loading.CELEBFIND;
            case 'Pro':
                return state.loading.PROFIND;
            case tableType.TEAM:
                return state.loading.TEAMFIND;
        }
    })

    const deleteMessage = () => {
        switch (table) {
            case 'Celeb':
            case 'Pro':
                let string;
                if (item.first_name && item.last_name) {
                    string = `${item.first_name} ${item.last_name}`
                } else if (item?.first_name) {
                    string = `${item.first_name}`
                } else {
                    string = `${item.id}`
                }
                return string;
            case tableType.TEAM:
                return `${item.id}`;
        }
    }

    return (
        loading ? <div>loading bar (move)</div> : 
        <Dialog
            open={open}
            onClose={props.handleClose}
        >
            <DialogTitle>
                {"Confirm Deletion"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete {deleteMessage()} from the {table}s table?
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