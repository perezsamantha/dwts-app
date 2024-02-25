import { alpha, Button, Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';
import { BsCheck2Circle } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { voteOption } from '../../../actions/polls';
import { expiresIn } from '../../shared/functions';

function Poll(props) {
    const dispatch = useDispatch();
    const { poll, user } = props;

    const [voted, setVoted] = useState(
        poll.options.find(
            (option) =>
                option.votes && option.votes.some((vote) => vote === user.id)
        )
    );

    let totalVotes = 0;
    poll.options.map((option) =>
        option.votes ? (totalVotes += option.votes.length) : 0
    );

    const handleVote = (option) => {
        dispatch(voteOption(option.id, poll.id));
        setVoted(option);
    };

    return (
        <Stack spacing={1.5}>
            <Typography variant="h6">{poll.title}</Typography>
            {poll.options.map((option, index) => (
                <StyledButton
                    variant="outlined"
                    key={index}
                    disabled={typeof voted === 'object'}
                    onClick={() => handleVote(option)}
                >
                    {option.votes && (
                        <Percentage
                            percent={
                                (option.votes.length / totalVotes) * 100 || 0
                            }
                            visible={(typeof voted === 'object').toString()}
                        />
                    )}
                    <Stack
                        direction="row"
                        spacing={1}
                        margin={0.5}
                        marginLeft={1}
                        marginRight={1}
                        zIndex={10}
                        alignItems="center"
                        justifyContent="space-between"
                        width={1}
                    >
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography>{option.data}</Typography>
                            {option.id === voted?.id && <BsCheck2Circle />}
                        </Stack>
                        {option.votes &&
                            option.votes.length > 0 &&
                            typeof voted === 'object' && (
                                <Typography variant="caption">
                                    {option.votes.length} vote
                                    {option.votes.length > 1 ? 's' : ''}
                                </Typography>
                            )}
                    </Stack>
                </StyledButton>
            ))}
            <Typography>Poll ends in {expiresIn(poll.expires)}</Typography>
        </Stack>
    );
}

const Percentage = styled('div')(({ theme, percent, visible }) => ({
    height: '100%',
    backgroundColor:
        theme.palette.mode === 'dark'
            ? theme.palette.secondary.dark
            : theme.palette.secondary.light,
    width: `${percent}%`,
    position: 'absolute',
    borderRadius: 20,
    opacity: visible ? 1 : 0,
}));

const StyledButton = styled(Button)(({ theme }) => ({
    minWidth: 300,
    maxWidth: 400,
    justifyContent: 'left',
    padding: 0,
    '&:disabled': {
        color: alpha(theme.palette.text.primary, 0.85),
        border: `1px solid ${alpha(theme.palette.text.primary, 0)}`,
    },
}));

export default Poll;
