import React, { useEffect } from 'react';
import {
    Button,
    DialogActions,
    Dialog,
    DialogContent,
    Typography,
    Divider,
    Stack,
    Link,
} from '@mui/material';

function AppInfo(props) {
    useEffect(() => {}, []);

    return (
        <Dialog
            fullWidth
            maxWidth={'lg'}
            open={props.open}
            onClose={props.close}
        >
            <DialogContent>
                <Stack mb={1}>
                    <Typography variant="h6">Overview</Typography>
                    <Divider />
                    <Stack spacing={1}>
                        <Typography>
                            This app was created and developed by avid DWTS fan
                            Samantha Perez. Samantha graduated from the
                            University of Central Florida in 2021 with her
                            Bachelors of Science in Computer Science and sought
                            out this app as a personal project to enhance her
                            skills in full-stack development.
                        </Typography>
                        <Typography>
                            Detailed information about the development process
                            and additional credits can be seen on the app's
                            documentation site{' '}
                            <Link
                                href={
                                    'https://perezsamantha.github.io/dwts-app/'
                                }
                                color="inherit"
                                underline="always"
                                target="_blank"
                                rel="noopener"
                            >
                                here
                            </Link>{' '}
                            and the app's code repository can be viewed{' '}
                            <Link
                                href={
                                    'https://github.com/perezsamantha/dwts-app'
                                }
                                color="inherit"
                                underline="always"
                                target="_blank"
                                rel="noopener"
                            >
                                here
                            </Link>
                            .
                        </Typography>
                    </Stack>
                </Stack>

                <Stack mb={1}>
                    <Typography variant="h6">Rights</Typography>
                    <Divider />
                    <Typography>
                        This app does not claim to own the rights to any
                        contextual information surrounding the television show
                        Dancing with the Stars; all credit belongs to Disney,
                        ABC Network, and BBC Worldwide. All images were
                        retrieved from Disney General Entertainment Content -
                        ABC Press and public Instagram/Twitter accounts.
                    </Typography>
                </Stack>

                <Stack mb={1}>
                    <Typography variant="h6">
                        Privacy & Cookie Policy
                    </Typography>
                    <Divider />
                    <Typography>
                        No data is collected or used for tracking purposes in
                        this web application. The app uses one cookie essential
                        for app functionality - either a URL-safe JSON web token
                        (JWT) or Google OAuth 2.0 access token dependent on the
                        user's sign in method. The token is used in every API
                        call to the app's server to ensure the user is
                        authenticated and authorized to access the requested
                        server data.
                    </Typography>
                </Stack>

                <Stack mb={1}>
                    <Typography variant="h6">Contact</Typography>
                    <Divider />
                    <Typography>
                        Please send all questions, concerns, and suggestions for
                        future development to samantha@dwtf.app.
                    </Typography>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AppInfo;
