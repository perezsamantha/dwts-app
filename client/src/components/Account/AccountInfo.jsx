import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Stack,
    Box,
} from '@mui/material';
import AccountSettings from './AccountSettings';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { RiInformationLine, RiUserSettingsLine } from 'react-icons/ri';
import CloseIcon from '@mui/icons-material/Close';
import { BsBookmarkStar, BsMoonStars, BsSun } from 'react-icons/bs';
import AppInfo from './AppInfo';
import { logout } from '../../actions/auth';

function AccountInfo(props) {
    const { user } = props;
    const [open, setOpen] = useState(props.open);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setOpen(props.open);
    }, [props]);

    const { toggleDark, handleDarkMode } = props;

    const openSettings = () => {
        setSettingsOpen(true);
    };

    const closeSettings = () => {
        setSettingsOpen(false);
    };

    const openInfo = () => {
        setInfoOpen(true);
    };

    const closeInfo = () => {
        setInfoOpen(false);
    };

    const handleLogout = () => {
        dispatch(logout(navigate));
    };

    return (
        <Dialog
            fullWidth
            maxWidth={'lg'}
            open={open}
            onClose={props.handleClose}
        >
            <DialogActions sx={{ paddingBottom: 0 }}>
                <Button onClick={props.handleClose}>
                    <CloseIcon />
                </Button>
            </DialogActions>

            <DialogContent sx={{ paddingTop: 0 }}>
                <Stack alignContent="left">
                    <Box>
                        <Button onClick={() => handleDarkMode(!toggleDark)}>
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >
                                {!toggleDark ? (
                                    <BsSun
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                        }}
                                    />
                                ) : (
                                    <BsMoonStars
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                        }}
                                    />
                                )}
                                <Typography>
                                    Switch to {toggleDark ? 'Light' : 'Dark'}{' '}
                                    Mode
                                </Typography>
                            </Stack>
                        </Button>
                    </Box>

                    {Array.of('pro', 'moderator', 'admin').includes(
                        user.role
                    ) && (
                        <Box>
                            <Button onClick={() => navigate('/admin')}>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                >
                                    <BsBookmarkStar
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                        }}
                                    />
                                    <Typography>Admin Panel</Typography>
                                </Stack>
                            </Button>
                        </Box>
                    )}

                    <Box>
                        <Button onClick={openSettings}>
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >
                                <RiUserSettingsLine
                                    style={{ width: '20px', height: '20px' }}
                                />{' '}
                                <Typography>Account Settings</Typography>
                            </Stack>
                        </Button>
                    </Box>

                    <Box>
                        <Button onClick={openInfo}>
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >
                                <RiInformationLine
                                    style={{ width: '20px', height: '20px' }}
                                />{' '}
                                <Typography>App Information</Typography>
                            </Stack>
                        </Button>
                    </Box>

                    <Box>
                        <Button onClick={handleLogout}>
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >
                                <FiLogOut
                                    style={{ width: '20px', height: '20px' }}
                                />{' '}
                                <Typography>Logout</Typography>
                            </Stack>
                        </Button>
                    </Box>
                </Stack>

                {settingsOpen && (
                    <AccountSettings
                        open={settingsOpen}
                        close={closeSettings}
                    />
                )}

                {infoOpen && <AppInfo open={infoOpen} close={closeInfo} />}
            </DialogContent>
        </Dialog>
    );
}

export default AccountInfo;
