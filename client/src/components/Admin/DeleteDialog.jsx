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
import Progress from '../shared/Progress';
import {
    getDanceName,
    getFullName,
    getFullTeamName,
    getSeasonAndWeek,
} from '../shared/functions';

function DeleteDialog(props) {
    const item = props.item;
    const table = props.table;
    const open = props.open;

    const loading = useSelector((state) => {
        switch (table) {
            case tableType.CELEB:
                return state.loading.CELEBFIND;
            case tableType.PRO:
                return state.loading.PROFIND;
            case tableType.SEASON:
                return state.loading.SEASONFIND;
            case tableType.EPISODE:
                return state.loading.EPISODEFIND;
            case tableType.TEAM:
                return state.loading.TEAMFIND;
            case tableType.DANCE:
                return state.loading.DANCEFIND;
            case tableType.JUDGE:
                return state.loading.JUDGEFIND;
            case tableType.SCORE:
                return state.loading.SCOREFIND;
            case tableType.DANCER:
                return state.loading.DANCERFIND;
            case tableType.TOUR:
                return state.loading.TOURFIND;
            case tableType.TOURCAST:
                return state.loading.TOURCASTFIND;
            case tableType.USER:
                return state.loading.USERFIND;
            default:
        }
    });

    const deleteMessage = () => {
        switch (table) {
            case tableType.CELEB:
                return getFullName(item);
            case tableType.PRO:
                return getFullName(item);
            case tableType.TEAM:
                return getFullTeamName(item.celeb, item.pro);
            case tableType.SEASON:
                return `Season ${item.id}`;
            case tableType.EPISODE:
                return getSeasonAndWeek(item);
            case tableType.JUDGE:
                return getFullName(item);
            case tableType.DANCE:
                return getDanceName(item);
            case tableType.SCORE:
                return `${getFullName(item.judge)}'s score of ${item.value}`;
            case tableType.DANCER:
                return `this dancer`;
            case tableType.TOUR:
                return item.name;
            case tableType.TOURCAST:
                return `this cast member`;
            case tableType.USER:
                return item.username;
            default:
        }
    };

    return (
        <Dialog open={open} onClose={props.handleClose}>
            <DialogTitle>{'Confirm Deletion'}</DialogTitle>

            {loading ? (
                <Progress />
            ) : (
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete {deleteMessage()} from
                        the {table}s table?
                    </DialogContentText>
                </DialogContent>
            )}

            <DialogActions>
                <Button onClick={props.handleClose} color="error">
                    Cancel
                </Button>
                <Button onClick={props.confirmDelete}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteDialog;
