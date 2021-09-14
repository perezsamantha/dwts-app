import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, makeStyles, MenuItem, InputLabel, Select } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';

import AvatarEditor from 'react-avatar-editor';
import { Slider } from '@material-ui/core';
import styled from 'styled-components';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { useNavigate } from 'react-router';
import { KeyboardDatePicker2, TextField1, TextField2, OpenSettings } from '../shared/muiStyles';
import { deletePro, fetchPros, findProById, setProPic, updatePro } from '../../actions/pros';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { HiddenInput, Label, FileInput } from '../shared/shared';

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

function ProSettings(props) {
    const classes = useStyles();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const pro = useSelector(state => state.pros.pros);
    const [formData, setFormData] = useState(pro);
    const [fileData, setFileData] = useState(null);
    const [scaleValue, setScaleValue] = useState(10);
    const id = formData._id;

    const dispatch = useDispatch();

    const handleChange = (e) => {
        if (["instagram", "twitter", "facebook"].includes(e.target.name)) {
            setFormData({ ...formData, proSocials: { ...formData.proSocials, [e.target.name]: e.target.value  } })
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    }

    const handleBirthday = (date) => {
        setFormData({ ...formData, birthday: date })
    }

    const handleOpen = () => {
        dispatch(findProById(props.id));
        setFormData(pro);
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
                dispatch(setProPic(id, data));
            })
        }

        dispatch(updatePro(id, formData));
        handleClose();
    }

    const handleClose = () => {
        setScaleValue(1);
        setOpen(false);
        setFileData(null);
    };

    const handleDelete = () => {

        dispatch(deletePro(id));
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
         <div><MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Button onClick={handleOpen}>
                <OpenSettings />
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle>Edit Pro</DialogTitle>
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
                        name="name"
                        label="Name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <KeyboardDatePicker2
                        margin="dense"
                        label="birthday"
                        name="Birthday"
                        format="MM/dd/yyyy"
                        value={formData.birthday}
                        onChange={handleBirthday}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />

                    <TextField1
                        margin="dense"
                        name="instagram"
                        label="Pro Instagram (Username)"
                        type="text"
                        value={formData.proSocials?.instagram}
                        onChange={handleChange}
                    />
                    
                    <TextField1
                        margin="dense"
                        name="twitter"
                        label="Pro Twitter (Username)"
                        type="text"
                        value={formData.proSocials?.twitter}
                        onChange={handleChange}
                    />

                    <TextField1
                        margin="dense"
                        name="facebook"
                        label="Pro Facebook (Username)"
                        type="text"
                        value={formData.proSocials?.facebook}
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
            </MuiPickersUtilsProvider>
        </div>
    )
}

export default ProSettings;