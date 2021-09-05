import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Button, InputAdornment, IconButton, makeStyles } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

import { updateTeam, deleteTeam, updatePic } from '../../actions/teams';
import { useDispatch, useSelector } from 'react-redux';

import AvatarEditor from 'react-avatar-editor';
import Avatar from 'react-avatar-edit';
import { Slider } from '@material-ui/core';
import styled from 'styled-components';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { findTeamById } from '../../actions/teams';

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
    const [open, setOpen] = useState(false);
    //const [formData, setFormData] = useState(props.team);
    const team = useSelector(state => state.teams);
    const [formData, setFormData] = useState(team);
    const [fileData, setFileData] = useState(null);
    const [scaleValue, setScaleValue] = useState(10);
    const [fileName, setFileName] = useState("Select new picture");
    const id = formData._id;

    const dispatch = useDispatch();

    const handleChange = (e) => {
        if (e.target.name == "instagram.celeb") {
            setFormData({ ...formData, socials: { ...formData.socials, instagram: { ...formData.socials.instagram, celeb: e.target.value } } })
        } else if (e.target.name == "instagram.pro") {
            setFormData({ ...formData, socials: { ...formData.socials, instagram: { ...formData.socials.instagram, pro: e.target.value } } })
        } else if (e.target.name == "twitter.celeb") {
            setFormData({ ...formData, socials: { ...formData.socials, twitter: { ...formData.socials.twitter, celeb: e.target.value } } })
        } else if (e.target.name == "twitter.pro") {
            setFormData({ ...formData, socials: { ...formData.socials, twitter: { ...formData.socials.twitter, pro: e.target.value } } })
        } else if (e.target.name == "facebook.celeb") {
            setFormData({ ...formData, socials: { ...formData.socials, facebook: { ...formData.socials.facebook, celeb: e.target.value } } })
        } else if (e.target.name == "facebook.pro") {
            setFormData({ ...formData, socials: { ...formData.socials, facebook: { ...formData.socials.facebook, pro: e.target.value } } })
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
        setFileName(e.target.files[0].name);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editor != null) {
            const data = new FormData();

            const canvas = editor.getImageScaledToCanvas();

            canvas.toBlob(function (blob) {
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
        setFileData(null);
        setFileName("Select new picture");
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
        setFileData(null);
        setFileName("Select new picture");
    }, []);

    const [editor, setEditor] = useState(null);

    const setEditorRef = (editor) => {
        setEditor(editor);
    }

    return (
        <div>
            <Button onClick={handleOpen}>
                <SettingsIcon className={classes.icon} />
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle>Team Settings</DialogTitle>
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
                        className={classes.names}
                        margin="dense"
                        name="teamName"
                        label="team name"
                        type="text"
                        value={formData.teamName}
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
                    <TextField
                        className={classes.names}
                        margin="dense"
                        name="instagram.celeb"
                        label="instagram - celeb"
                        type="text"
                        value={formData.socials?.instagram.celeb}
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.names}
                        margin="dense"
                        name="instagram.pro"
                        label="instagram - pro"
                        type="text"
                        value={formData.socials?.instagram.pro}
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.names}
                        margin="dense"
                        name="twitter.celeb"
                        label="twitter - celeb"
                        type="text"
                        value={formData.socials?.twitter.celeb}
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.names}
                        margin="dense"
                        name="twitter.pro"
                        label="twitter - pro"
                        type="text"
                        value={formData.socials?.twitter.pro}
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.names}
                        margin="dense"
                        name="facebook.celeb"
                        label="facebook - celeb"
                        type="text"
                        value={formData.socials?.facebook.celeb}
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.names}
                        margin="dense"
                        name="facebook.pro"
                        label="facebook - pro"
                        type="text"
                        value={formData.socials?.facebook.pro}
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