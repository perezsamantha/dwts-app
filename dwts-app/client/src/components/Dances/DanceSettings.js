import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, makeStyles, FormControl, InputLabel, Select, MenuItem, CircularProgress, FormControlLabel, Checkbox, ListItemText, Input, Chip, ListSubheader } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

import { deleteDance, findDanceById, updateDance, setDancePic } from '../../actions/dances';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPros } from '../../actions/pros';
import { styles, seasons, weeks, themes, placements, judges, guestJudges, scores } from '../../constants/dropdowns';
import { fetchTeams } from '../../actions/teams';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { useNavigate } from 'react-router';
import CloseIcon from '@material-ui/icons/Close';
import { HiddenInput, Label, FileInput } from '../shared/shared';
import AvatarEditor from 'react-avatar-editor';
import { Slider } from '@material-ui/core';
import { AddJudge, ChipsWrapper, FormControl1, FormControl2, FormControl3, FormControlJudge, FormControlScore, IndividualChip, OpenSettings, RemoveJudge, TextField1, TextField2 } from '../shared/muiStyles';
import { StylesProvider } from '@material-ui/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginRight: theme.spacing(1.5),
        }
    },
}));

function DanceSettings(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dance = useSelector(state => state.dances.dances);
    const pros = useSelector(state => state.pros.pros);
    const teams = useSelector(state => state.teams.teams);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(dance);
    const [fileData, setFileData] = useState(null);
    const [scaleValue, setScaleValue] = useState(10);
    const id = formData._id;

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
        dispatch(findDanceById(props.id));
        dispatch(fetchTeams());
        setFormData(dance);
        setOpen(true);
    };

    const handleFile = (e) => {
        setFileData(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editor != null) {
            const data = new FormData();

            const canvas = editor.getImageScaledToCanvas();

            canvas.toBlob(function (blob) {
                data.append("coverPic", blob, `${Date.now()}-${fileData.name}`);
                dispatch(setDancePic(id, data));
            })
        }

        dispatch(updateDance(id, formData));
        handleClose();
    };

    const handleClose = () => {
        setScaleValue(1);
        setOpen(false);
        setFileData(null);
    };

    const handleDelete = () => {
        dispatch(deleteDance(id));
        handleClose();
        navigate(-1);
    }

    const handleScale = (e, newValue) => {
        e.preventDefault();
        setScaleValue(newValue);
    }

    useEffect(() => {
        setScaleValue(1);
        setFileData(null);
    }, []);

    const [editor, setEditor] = useState(null);

    const setEditorRef = (editor) => {
        setEditor(editor);
    }

    return (

        !Array.isArray(pros) ? <div>loading bar</div> : <div style={{ height: "15px" }}>
            <Button onClick={handleOpen}>
                <OpenSettings />
            </Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>Edit Dance</DialogTitle>
                <DialogContent >

                    <HiddenInput
                        type="file"
                        accept=".jpeg, .jpg, .png"
                        onChange={handleFile}
                        id="file"
                    />
                    <Label htmlFor="file">
                        <AddAPhotoIcon />
                    </Label>
                    <FileInput>
                        {fileData != null && <div>
                            <AvatarEditor
                                image={fileData}
                                width={200}
                                height={200}
                                borderRadius={100}
                                border={0}
                                scale={scaleValue}
                                ref={setEditorRef}
                                className={classes.editor}
                            />
                            <Slider className={classes.slider} value={scaleValue} onChange={handleScale} min={1} max={5} step={0.01} />
                        </div>}
                    </FileInput>

                    <FormControl1 required margin="dense">
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
                                <ChipsWrapper >
                                    {selected.map((value) => (
                                        <IndividualChip
                                            key={value}
                                            label={`${teams.find((team) => team._id === value).celeb.split(" ")[0]} & ${teams.find((team) => team._id === value).pro.split(" ")[0]}`}

                                        />
                                    ))}
                                </ChipsWrapper>
                            )}
                        >
                            {teams.map((team, index) => (
                                <MenuItem key={index} value={team._id}>
                                    <Checkbox checked={formData.teams.indexOf(team._id) > -1} />
                                    <ListItemText primary={`${team.celeb.split(" ")[0]} & ${team.pro.split(" ")[0]}`} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl1>

                    <FormControl1 required margin="dense">
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
                    </FormControl1>

                    <Wrapper>
                        <FormControl3 margin="dense" required >
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
                        </FormControl3>

                        <FormControl3 margin="dense" required >
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
                        </FormControl3>

                        <FormControl3 margin="dense" >
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
                        </FormControl3>
                    </Wrapper>

                    <AddJudge variant="outlined" onClick={addScore}>Add Judge & Score</AddJudge>

                    {formData.scores.map((score, parentIndex) => {
                        return (
                            <Wrapper key={parentIndex}>
                                <FormControlJudge required margin="dense" >
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
                                </FormControlJudge>

                                <FormControlScore required margin="dense" >
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
                                </FormControlScore>

                                <RemoveJudge id={parentIndex} onClick={removeScore} />
                            </Wrapper>
                        )
                    })}

                    <TextField1
                        margin="dense"
                        name="songTitle"
                        label="Song Title"
                        type="text"
                        value={formData.songTitle}
                        onChange={handleChange}
                    />
                    <TextField1
                        margin="dense"
                        name="songArtist"
                        label="Song Artist"
                        type="text"
                        value={formData.songArtist}
                        onChange={handleChange}
                    />

                    <Wrapper>
                        <FormControl2 margin="dense" >
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
                        </FormControl2>

                        <FormControl2 margin="dense" >
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
                        </FormControl2>
                    </Wrapper>

                    <Wrapper>
                        <FormControl2 margin="dense">
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
                        </FormControl2>

                        <TextField2
                            margin="dense"
                            name="link"
                            label="Link"
                            type="text"
                            value={formData.link}
                            onChange={handleChange}
                        />
                    </Wrapper>

                    <TextField1
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
                        Update
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const Wrapper = styled.div`
    width: 100%;
`;

export default DanceSettings;