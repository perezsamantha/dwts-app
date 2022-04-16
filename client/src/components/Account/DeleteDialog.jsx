import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../actions/auth';
import {
    Button,
    DialogActions,
    Dialog,
    DialogTitle,
    DialogContent,
    Stack,
    Typography,
} from '@mui/material';

function DeleteDialog(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(deleteUser(navigate));

        props.close();
    };

    return (
        <Dialog maxWidth={'lg'} open={props.open} onClose={props.close}>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogContent>
                <Stack alignItems="center" my={1}>
                    <Typography align="center">
                        Are you sure you want to delete your account?
                    </Typography>
                    <Typography align="center" sx={{ color: 'text.secondary' }}>
                        This action cannot be undone
                    </Typography>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close} color="error">
                    No, Cancel
                </Button>
                <Button onClick={handleSubmit}>Yes, Delete</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteDialog;
