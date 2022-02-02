import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, makeStyles, MenuItem, InputLabel, Select } from '@material-ui/core';

import { updateTeam, deleteTeam, setTeamPic } from '../../actions/teams';
import { useDispatch, useSelector } from 'react-redux';

import AvatarEditor from 'react-avatar-editor';
import { Slider } from '@material-ui/core';
import styled from 'styled-components';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { findTeamById } from '../../actions/teams';
import { useNavigate } from 'react-router';
import { FormControl2, TextField1, TextField2, OpenSettings } from '../shared/muiStyles';
import { seasons, placements } from '../../constants/dropdowns';
import { fetchPros } from '../../actions/pros';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginRight: theme.spacing(1.5),
        }
    },
    slider: {
        width: "20ch",
        position: "relative",
    },
    editor: {
        margin: "10px 20px 10px 0px",
    },
    icon: {
        color: "white",
    },
}));

function TeamSettings(props) {
    const classes = useStyles();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const team = useSelector(state => state.teams.teams);
    const pros = useSelector(state => state.pros.pros);
    const [formData, setFormData] = useState(team);
    const [fileData, setFileData] = useState(null);
    const [scaleValue, setScaleValue] = useState(10);
    const id = formData._id;

    const dispatch = useDispatch();

    const handleChange = (e) => {
        if (["instagram", "twitter", "facebook"].includes(e.target.name)) {
            setFormData({ ...formData, celebSocials: { ...formData.celebSocials, [e.target.name]: e.target.value  } })
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    }

    const handleOpen = () => {
        dispatch(findTeamById(props.id));
        setFormData(team);
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
                dispatch(setTeamPic(id, data));
            })
        }

        dispatch(updateTeam(id, formData));
        handleClose();
    }

    const handleClose = () => {
        setScaleValue(1);
        setOpen(false);
        setFileData(null);
    };

    const handleDelete = () => {

        dispatch(deleteTeam(id));
        handleClose();
        navigate(-1);
    }

    const handleScale = (e, newValue) => {
        e.preventDefault();
        setScaleValue(newValue);
    }

    useEffect(() => {
        dispatch(fetchPros());
        setScaleValue(1);
        setFileData(null);
    }, []);

    const [editor, setEditor] = useState(null);

    const setEditorRef = (editor) => {
        setEditor(editor);
    }

    return (
        !Array.isArray(pros) ? <div>loading bar</div> : <div>
            <Button onClick={handleOpen}>
                <OpenSettings />
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle>Edit Team</DialogTitle>
                <DialogContent className={classes.root} >

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

                    <TextField2
                        margin="dense"
                        name="celeb"
                        label="Celebrity"
                        type="text"
                        value={formData.celeb}
                        onChange={handleChange}
                        required
                    />

                    <FormControl2 margin="dense" required>
                        <InputLabel id="pro">Professional</InputLabel>
                        <Select
                            labelId="pro"
                            name="pro"
                            value={formData.pro}
                            onChange={handleChange}
                        >
                            {pros.map((pro, index) => (
                                <MenuItem key={index} value={pro._id}>{pro.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl2>

                    <FormControl2 margin="dense" required >
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
                    </FormControl2>

                    <FormControl2 margin="dense" >
                        <InputLabel id="placement">Placement</InputLabel>
                        <Select
                            labelId="placement"
                            name="placement"
                            value={formData.placement}
                            onChange={handleChange}
                        >
                            {placements.map((placement, index) => (
                                <MenuItem key={index} value={placement}>{placement}</MenuItem>
                            ))}
                        </Select>
                    </FormControl2>

                    <TextField1
                        margin="dense"
                        name="teamName"
                        label="Team Name"
                        type="text"
                        value={formData.teamName}
                        onChange={handleChange}
                    />

                    <TextField1
                        margin="dense"
                        name="instagram"
                        label="Celeb Instagram (Username)"
                        type="text"
                        value={formData.celebSocials?.instagram}
                        onChange={handleChange}
                    />
                    
                    <TextField1
                        margin="dense"
                        name="twitter"
                        label="Celeb Twitter (Username)"
                        type="text"
                        value={formData.celebSocials?.twitter}
                        onChange={handleChange}
                    />

                    <TextField1
                        margin="dense"
                        name="facebook"
                        label="Celeb Facebook (Username)"
                        type="text"
                        value={formData.celebSocials?.facebook}
                        onChange={handleChange}
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

const HiddenInput = styled.input`
    opacity: 0;
    width: 0.1px;
    height: 0.1px;
    position: absolute;
`;

const Label = styled.label`
    display: block;
    position: relative;
    width: fit-content;
    border-radius: 25px;
    background: linear-gradient(99deg, rgba(198,161,67,1) 0%, rgba(232,216,136,1) 55%, rgba(198,161,67,1) 100%);
    box-shadow: 0 4px 7px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    transition: transform .2s ease-out;
    padding: 10px;
    overflow: hidden;
    font-size: 1.3vh;
`;

const FileInput = styled.div`
    display: flex;
    flex-direction: column;
`;

export default TeamSettings;