import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, makeStyles, FormControl, InputLabel, Select, MenuItem, CircularProgress, FormControlLabel, Checkbox, ListItemText, Input, Chip, ListSubheader } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { addDance } from '../../actions/dances';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPros } from '../../actions/pros';
import { styles, seasons, weeks, themes, placements, judges, guestJudges, scores } from '../../constants/dropdowns';
import { fetchTeams } from '../../actions/teams';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginRight: theme.spacing(1.5),
        }
    },
    button: {
        minHeight: "10px",
        minWidth: "10px",
        maxHeight: "10px",
        maxWidth: "10px",
        color: "grey",
    },
    judgeButton: {
        margin: "20px auto 0 auto",
    },
    one: {
        width: "98%",
        marginRight: "2%"
    },
    two: {
        width: "48%",
        marginRight: "2%"
    },
    three: {
        width: "31.3%",
        marginRight: "2%"
    },
    judge: {
        width: "61%",
        marginRight: "2%"
    },
    score: {
        width: "30%",
        marginRight: "2%"
    },
    remove: {
        width: "5%",
        color: "grey",
        cursor: "pointer",
        marginTop: "20px"
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
}));

function DanceAdd() {
    const classes = useStyles();

    const initialState = {
        teams: [],
        style: '',
        season: '',
        week: '',
        night: '',
        theme: '',
        songTitle: '',
        songArtist: '',
        isPerfect: false,
        runningOrder: '',
        extra: '',
        scores: []
    };

    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const dispatch = useDispatch();
    const pros = useSelector(state => state.pros.pros);
    const teams = useSelector(state => state.teams.teams);

    useEffect(() => {
        dispatch(fetchTeams());
        dispatch(fetchPros());
    }, [dispatch])

    const addScore = (e) => {
        setFormData({ ...formData, scores: [...formData.scores, { judge: '', score: '' }] });
    }

    const removeScore = (e) => {
        let scores = [...formData.scores];
        scores.splice(e.target.parentElement.id, 1);
        setFormData({ ...formData, scores });
    }

    const handleChange = (e, item) => {
        if (e.target.name === "judge" || e.target.name === "score") {
            let scores = [...formData.scores];
            scores[item.props.id][e.target.name] = e.target.value;
            setFormData({ ...formData, scores });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        dispatch(addDance(formData));
        setFormData(initialState);
        handleClose();
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        !Array.isArray(pros) || !Array.isArray(teams) ? <div>loading bar</div> : <div style={{ height: "15px" }}>
            <Button className={classes.button} disableRipple onClick={handleOpen}>
                <AddIcon />
            </Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>Add Dance</DialogTitle>
                <DialogContent className={classes.root} spacing={5}>

                    <FormControl required margin="dense" className={classes.one}>
                        <InputLabel id="teams">Team(s)</InputLabel>
                        <Select
                            labelId="teams"
                            id="teams"
                            name="teams"
                            multiple
                            value={formData.teams}
                            onChange={handleChange}
                            input={<Input id="select-multiple-chip" />}
                            // renderValue={(selected) => selected.join(', ')}
                            renderValue={(selected) => (
                                <div className={classes.chips}>
                                    {selected.map((value) => (
                                        <Chip
                                            key={value}
                                            label={`${teams.find((team) => team._id === value).celeb.split(" ")[0]} & ${pros.find(pro => pro._id === teams.find((team) => team._id === value).pro).name.split(" ")[0]}`}
                                            className={classes.chip}
                                        />
                                    ))}
                                </div>
                            )}
                        >
                            {teams.map((team, index) => (
                                <MenuItem key={index} value={team._id}>
                                    <Checkbox checked={formData.teams.indexOf(team._id) > -1} />
                                    <ListItemText primary={`${team.celeb.split(" ")[0]} & ${pros.find(pro => pro._id === team.pro).name.split(" ")[0]}`} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl required margin="dense" className={classes.one}>
                        <InputLabel id="style">Style</InputLabel>
                        <Select
                            labelId="style"
                            name="style"
                            value={formData.style}
                            onChange={handleChange}
                        >
                            {styles.map((style, index) => (
                                <MenuItem key={index} value={style}>{style}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Wrapper >
                        <FormControl margin="dense" required className={classes.three}>
                            <InputLabel id="season">Season</InputLabel>
                            <Select
                                labelId="season"
                                name="season"
                                value={formData.season}
                                onChange={handleChange}
                            >
                                {seasons.map((season, index) => (
                                    <MenuItem key={index} value={season}>{season}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl margin="dense" required className={classes.three}>
                            <InputLabel id="week">Week</InputLabel>
                            <Select
                                labelId="week"
                                name="week"
                                value={formData.week}
                                onChange={handleChange}
                            >
                                {weeks.map((week, index) => (
                                    <MenuItem key={index} value={week}>{week}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl margin="dense" className={classes.three}>
                            <InputLabel id="night">Night</InputLabel>
                            <Select
                                labelId="night"
                                name="night"
                                value={formData.night}
                                onChange={handleChange}
                            >
                                <MenuItem key={0} value=''>Not applicable</MenuItem>
                                <MenuItem key={1} value={1}>1</MenuItem>
                                <MenuItem key={2} value={2}>2</MenuItem>
                            </Select>
                        </FormControl>
                    </Wrapper>

                    <Button className={classes.judgeButton} variant="outlined" onClick={addScore}>Add Judge & Score</Button>

                    {formData.scores.map((score, parentIndex) => {
                        return (
                            <Wrapper >
                                <FormControl required margin="dense" className={classes.judge}>
                                    <InputLabel id="judge">Judge</InputLabel>
                                    <Select
                                        labelId="judge"
                                        name="judge"
                                        value={score.judge}
                                        onChange={handleChange}
                                    >
                                        <ListSubheader>Main Judges</ListSubheader>
                                        {judges.map((judge, index) => (
                                            <MenuItem id={parentIndex} key={index} value={judge}>{judge}</MenuItem>
                                        ))}
                                        <ListSubheader>Guest Judges</ListSubheader>
                                        {guestJudges.map((judge, index) => (
                                            <MenuItem id={parentIndex} key={index} value={judge}>{judge}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl required margin="dense" className={classes.score}>
                                    <InputLabel id="score">Score</InputLabel>
                                    <Select
                                        labelId="score"
                                        name="score"
                                        value={score.score}
                                        onChange={handleChange}
                                    >
                                        {scores.map((score, index) => (
                                            <MenuItem id={parentIndex} key={index} value={score}>{score}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <CloseIcon id={parentIndex} className={classes.remove} onClick={removeScore} />
                            </Wrapper>
                        )
                    })}

                    <TextField
                        className={classes.one}
                        margin="dense"
                        name="songTitle"
                        label="Song Title"
                        type="text"
                        value={formData.songTitle}
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.one}
                        margin="dense"
                        name="songArtist"
                        label="Song Artist"
                        type="text"
                        value={formData.songArtist}
                        onChange={handleChange}
                    />

                    <Wrapper>
                        <FormControl margin="dense" className={classes.two}>
                            <InputLabel id="theme">Theme</InputLabel>
                            <Select
                                labelId="theme"
                                name="theme"
                                value={formData.theme}
                                onChange={handleChange}
                            >
                                {themes.map((theme, index) => (
                                    <MenuItem key={index} value={theme}>{theme}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl margin="dense" className={classes.two}>
                            <InputLabel id="isPerfect">Perfect Score?</InputLabel>
                            <Select
                                labelId="isPerfect"
                                name="isPerfect"
                                value={formData.isPerfect}
                                onChange={handleChange}
                            >
                                <MenuItem key={1} value={true}>Yes</MenuItem>
                                <MenuItem key={2} value={false}>No</MenuItem>
                            </Select>
                        </FormControl>
                    </Wrapper>

                    <Wrapper>
                        <FormControl margin="dense" className={classes.two}>
                            <InputLabel id="ro">Running Order</InputLabel>
                            <Select
                                labelId="ro"
                                name="runningOrder"
                                value={formData.runningOrder}
                                onChange={handleChange}
                            >
                                {placements.map((placement, index) => (
                                    <MenuItem key={index} value={placement}>{placement}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            className={classes.two}
                            margin="dense"
                            name="link"
                            label="Link"
                            type="text"
                            value={formData.link}
                            onChange={handleChange}
                        />
                    </Wrapper>


                    <TextField
                        className={classes.one}
                        margin="dense"
                        name="extra"
                        label="Extra Notes"
                        type="text"
                        value={formData.extra}
                        onChange={handleChange}
                        multiline
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Add Dance
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const Wrapper = styled.div`
    width: 100%;
`;

export default DanceAdd;

