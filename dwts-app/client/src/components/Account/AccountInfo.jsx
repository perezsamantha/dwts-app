import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import EditAccountFields from './EditAccountFields';

function AccountInfo(props) {
    const { user } = props;
    const [open, setOpen] = useState(props.open);
    const [settingsOpen, setSettingsOpen] = useState(false);

    useEffect(() => {
        setOpen(props.open);
    }, [props]);

    const openSettings = () => {
        setSettingsOpen(true);
    };

    const closeSettings = () => {
        setSettingsOpen(false);
    };

    return (
        <Dialog
            fullWidth
            maxWidth={'lg'}
            open={open}
            onClose={props.handleClose}
        >
            <DialogTitle>Account</DialogTitle>

            <DialogContent>
                {/* <Accordion sx={{ margin: 2 }}>
                        <AccordionSummary>Settings</AccordionSummary>
                        <AccordionDetails>
                            <EditAccountFields user={user} />
                        </AccordionDetails>
                    </Accordion> */}
                <Button onClick={openSettings}>Open Account Settings</Button>

                {settingsOpen && (
                    <EditAccountFields
                        user={user}
                        open={settingsOpen}
                        close={closeSettings}
                    />
                )}

                <Accordion sx={{ margin: 2 }}>
                    <AccordionSummary>App Information</AccordionSummary>
                    <AccordionDetails>Testing</AccordionDetails>
                </Accordion>
                {/* TODO: delete account button with confirmation dialog */}
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={props.handleClose}
                    variant="contained"
                    color="error"
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AccountInfo;
