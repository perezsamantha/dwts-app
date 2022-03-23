import React from 'react';
import { useSelector } from 'react-redux';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
} from '@mui/material';
import * as tableType from '../../constants/tableTypes';
import DataGetter from '../shared/DataGetter';
import Progress from '../shared/Progress';

function DeleteDialog(props) {
    const item = props.item;
    const table = props.table;
    const open = props.open;

    const loading = useSelector((state) => {
        switch (table) {
            case 'Celeb':
                return state.loading.CELEBFIND;
            case 'Pro':
                return state.loading.PROFIND;
            case tableType.TEAM:
                return state.loading.TEAMFIND;
            default:
        }
    });

    const deleteMessage = () => {
        switch (table) {
            case tableType.CELEB:
                return <DataGetter id={item.id} type={tableType.CELEB} />;
            case tableType.PRO:
                return <DataGetter id={item.id} type={tableType.PRO} />;
            case tableType.TEAM:
                return <DataGetter id={item.id} type={tableType.TEAM} />;
            case tableType.SEASON:
                return (
                    <>
                        Season{' '}
                        <DataGetter id={item.id} type={tableType.SEASON} />
                    </>
                );
            case tableType.EPISODE:
                return <DataGetter id={item.id} type={tableType.EPISODE} />;
            case tableType.JUDGE:
                return <DataGetter id={item.id} type={tableType.JUDGE} />;
            case tableType.DANCE:
                return <DataGetter id={item.id} type={tableType.DANCE} />;
            case tableType.SCORE:
                return `this score`;
            case tableType.DANCER:
                return `this dancer`;
            case tableType.USER:
                return `this user`;
            default:
        }
    };

    return loading ? (
        <Progress />
    ) : (
        <Dialog open={open} onClose={props.handleClose}>
            <DialogTitle>{'Confirm Deletion'}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete {deleteMessage()} from the{' '}
                    {table}s table?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={props.handleClose}
                    variant="contained"
                    color="error"
                >
                    CANCEL
                </Button>
                <Button
                    onClick={props.confirmDelete}
                    variant="contained"
                    color="primary"
                >
                    DELETE
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteDialog;
