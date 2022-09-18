import {
    AccordionActions,
    Box,
    Button,
    Card,
    Divider,
    Stack,
    Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    deletePoll,
    deletePollOption,
    fetchPolls,
} from '../../../actions/polls';
import {
    StyledAccordion,
    StyledAccordionDetails,
    StyledAccordionSummary,
} from '../../shared/muiStyles';
import AddPollDialog from './AddPollDialog';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import AddOptionDialog from './AddOptionDialog';
import DeletePollDialog from './DeletePollDialog';
import Progress from '../../shared/Progress';

function Polls() {
    const dispatch = useDispatch();
    const polls = useSelector((state) => state.polls.polls);
    const loading = useSelector((state) => state.loading.POLLSEARCH);

    const [open, setOpen] = useState({
        add: false,
        delete: false,
        id: null,
        error: false,
    });

    useEffect(() => {
        dispatch(fetchPolls({ type: 'all' }));
    }, [dispatch]);

    const handleClose = () => {
        setOpen({ add: false, delete: false, id: null });
    };

    const handleAdd = (id) => {
        setOpen({ add: true, id: id });
    };

    const handleDelete = (id) => {
        setOpen({ delete: true, id: id });
    };

    const handleDeleteOption = (id, poll_id) => {
        dispatch(deletePollOption(id, poll_id));
    };

    const confirmDelete = () => {
        dispatch(deletePoll(open.id));
        setOpen({ add: false, delete: false, id: null });
    };

    return (
        <Box sx={{ height: 650, minWidth: '100%' }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >
                <Typography variant="h5">Polls</Typography>
                <AddPollDialog />
            </Stack>
            <Stack>
                {loading ? (
                    <Progress />
                ) : (
                    <>
                        {polls.map((poll, index) => (
                            <Card key={index}>
                                <StyledAccordion elevation={0}>
                                    <StyledAccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        <Typography variant="h5">
                                            {poll.title}
                                        </Typography>
                                    </StyledAccordionSummary>
                                    <StyledAccordionDetails sx={{ padding: 0 }}>
                                        <Divider />

                                        <Typography mb={1}>
                                            Expires: {poll.expires}
                                        </Typography>

                                        {poll.options &&
                                            poll.options.map(
                                                (option, index) => (
                                                    <Stack key={index}>
                                                        <Stack
                                                            direction="row"
                                                            justifyContent="space-between"
                                                            alignItems="center"
                                                        >
                                                            <Typography>
                                                                {option.data}
                                                            </Typography>
                                                            <Button
                                                                onClick={() =>
                                                                    handleDeleteOption(
                                                                        option.id,
                                                                        option.poll_id
                                                                    )
                                                                }
                                                            >
                                                                <CloseIcon />
                                                            </Button>
                                                        </Stack>
                                                    </Stack>
                                                )
                                            )}
                                    </StyledAccordionDetails>
                                    <AccordionActions>
                                        <Button
                                            onClick={() => handleAdd(poll.id)}
                                        >
                                            Add Option
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                handleDelete(poll.id)
                                            }
                                        >
                                            Delete Poll
                                        </Button>
                                    </AccordionActions>
                                </StyledAccordion>
                            </Card>
                        ))}
                    </>
                )}
            </Stack>

            {open.add && (
                <AddOptionDialog
                    id={open.id}
                    open={open.add}
                    handleClose={handleClose}
                />
            )}

            {open.delete && (
                <DeletePollDialog
                    open={open.delete}
                    handleClose={handleClose}
                    confirmDelete={confirmDelete}
                />
            )}
        </Box>
    );
}

export default Polls;
