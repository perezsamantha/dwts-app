import React, { useEffect } from 'react';
import {
    Button,
    DialogActions,
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Divider,
    Stack,
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
            {/* <DialogTitle>App Information</DialogTitle> */}
            <DialogContent>
                <Stack mb={1}>
                    <Typography variant="h6">Overview</Typography>
                    <Divider />
                    <Typography>
                        This app was created and developed by avid DWTS fan
                        Samantha Perez. Samantha graduated from the University
                        of Central Florida in 2021 with her Bachelors of Science
                        in Computer Science and sought out this app as a
                        personal project to enhance her skills in full-stack
                        development.
                    </Typography>
                    <Typography>
                        The app's GitHub repository and extensive information on
                        the development process can be viewed here.
                    </Typography>
                    <Typography>
                        Special thanks to ... for helping with data entry.
                    </Typography>
                </Stack>

                <Stack mb={1}>
                    <Typography variant="h6">Credit</Typography>
                    <Divider />
                    <Typography>
                        This app does not own the rights to any contextual
                        information surrounding the television show Dancing with
                        the Stars; all credit belongs to ABC Network and BBC
                        Worldwide. All images, excluding user-uploaded profile
                        pictures, were retrieved from Disney General
                        Entertainment Content - ABC Press and public
                        Instagram/Twitter accounts.
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
                        for app functionality - a URL-safe JSON web token (JWT)
                        used in every API call to the app's server to ensure the
                        user is authenticated and authorized to access the
                        requested server data. Additionally, this app is not
                        monetized and therefore does not incorporate any
                        advertisements or third-party software.
                    </Typography>
                </Stack>

                <Stack mb={1}>
                    <Typography variant="h6">Contact</Typography>
                    <Divider />
                    <Typography>
                        Please send all questions, concerns, and suggestions for
                        future development to dwtsapp@gmail.com.
                    </Typography>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close} variant="contained">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AppInfo;
