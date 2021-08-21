import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Button, InputAdornment, IconButton, makeStyles } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

import { updateTeam, deleteTeam, updatePic } from '../../actions/teams';
import { useDispatch } from 'react-redux';

import AvatarEditor from 'react-avatar-editor';
import Avatar from 'react-avatar-edit';
import { Slider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginRight: theme.spacing(1.5),
        }
    },
    names: {
        width: "20ch"
    },
    numbers: {
        width: "10ch"
    },
    slider: {
        width: "20ch",
    },
}));

function TeamSettings(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(props.team);
    const [fileData, setFileData] = useState(null);
    const [scaleValue, setScaleValue] = useState(10);
    const id = formData._id;

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleOpen = () => {
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

            canvas.toBlob(function(blob) {
                data.append("promoPic", blob, `${Date.now()}-${fileData.name}`);
                dispatch(updatePic(id, data));
            })

            
        }

        // if (fileData != null) {
        //     console.log(fileData);
        //     const data = new FormData();
        //     data.append("promoPic", fileData);

        //     dispatch(updatePic(id, data));
        // }

        dispatch(updateTeam(id, formData));
        handleClose();
    }

    const handleClose = () => {
        setScaleValue(1);
        setOpen(false);
    };

    const handleDelete = () => {

        dispatch(deleteTeam(id));
        handleClose();
    }

    const handleScale = (e, newValue) => {
        e.preventDefault();
        setScaleValue(newValue);
    }

    useEffect(() => {
        setScaleValue(1);
    }, []);

    const [editor, setEditor] = useState(null);

    const setEditorRef = (editor) => {
        setEditor(editor);
    }

    return (
        <div>
            <Button color="primary" onClick={handleOpen}>
                <SettingsIcon />
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle>Team Settings</DialogTitle>
                <DialogContent className={classes.root} >
                    <input
                        type="file"
                        accept=".jpeg, .jpg, .png"
                        onChange={handleFile}
                    />
                    {fileData != null && <div>
                        <AvatarEditor
                            image={fileData}
                            width={150}
                            height={150}
                            borderRadius={100}
                            scale={scaleValue}
                            ref={setEditorRef}
                        />
                        <Slider className={classes.slider} value={scaleValue} onChange={handleScale} min={1} max={5} step={0.01} />
                        </div>}
                    {/* <Avatar
                        width={200}
                        height={200}
                        onCrop={setPreview(preview)}
                        src={fileData}
                    /> */}
                    <TextField
                        className={classes.names}
                        margin="dense"
                        name="celeb"
                        label="celeb"
                        type="text"
                        value={formData.celeb}
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.names}
                        margin="dense"
                        name="pro"
                        label="pro"
                        type="text"
                        value={formData.pro}
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.numbers}
                        margin="dense"
                        name="season"
                        label="season"
                        type="text"
                        value={formData.season}
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.numbers}
                        margin="dense"
                        name="placement"
                        label="placement"
                        type="text"
                        value={formData.placement}
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.numbers}
                        margin="dense"
                        name="numDances"
                        label="# dances"
                        type="text"
                        value={formData.numDances}
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.numbers}
                        margin="dense"
                        name="numTens"
                        label="# tens"
                        type="text"
                        value={formData.numTens}
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.numbers}
                        margin="dense"
                        name="numPerfects"
                        label="# perfects"
                        type="text"
                        value={formData.numPerfects}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Update Team
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Delete Team
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default TeamSettings;