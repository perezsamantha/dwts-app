import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, TextField } from '@mui/material';

import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { genders, placements } from '../../constants/dropdowns';
import * as tableType from '../../constants/tableTypes';

import { addCeleb } from '../../actions/celebs';
import { addPro } from '../../actions/pros';
import { addTeam } from '../../actions/teams';

function AddDialog(props) {
    const table = props.table
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    const initialState = () => {
        switch (table) {
            case 'Celeb':
                return {
                    cover_pic: null,
                    first_name: null,
                    last_name: null,
                    birthday: new Date().toISOString(),
                    //birthday: null,
                    height: null,
                    gender: null,
                    twitter: null,
                    instagram: null,
                    tiktok: null,
                    is_junior: false
                }
            case 'Pro':
                return {
                    cover_pic: null,
                    first_name: null,
                    last_name: null,
                    birthday: new Date().toISOString(),
                    //birthday: null,
                    height: null,
                    gender: null,
                    twitter: null,
                    instagram: null,
                    tiktok: null,
                    is_junior: false
                }
            case tableType.TEAM:
                return {
                    cover_pic: null,
                    celeb_id: null,
                    pro_id: null,
                    mentor_id: null,
                    season_id: null,
                    placement: null,
                    team_name: null,
                    extra: null
                }
        }
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleBirthday = (date) => {
        setFormData({ ...formData, birthday: date })
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        switch (table) {
            case 'Celeb':
                dispatch(addCeleb(formData));
                break
            case 'Pro':
                dispatch(addPro(formData));
                break
            case tableType.TEAM:
                console.log(formData)
                dispatch(addTeam(formData));
                break
            default:
            //console.log('Invald table type');
        }
        setFormData(initialState);
        handleClose();
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <LocalizationProvider dateAdapter={DateAdapter}>
                <Button variant="contained" disableRipple onClick={handleOpen}>
                    Add {table}
                </Button>
                <Dialog fullWidth maxWidth={'lg'} open={open} onClose={handleClose} >
                    <DialogTitle>Add {table}</DialogTitle>
                    <DialogContent >

                        {Array.of('Celeb', 'Pro').includes(table) &&
                            <TextField
                                margin="dense"
                                name="first_name"
                                label="First Name"
                                type="text"
                                value={formData.first_name}
                                onChange={handleChange}
                            />
                        }

                        {Array.of('Celeb', 'Pro').includes(table) &&
                            <TextField
                                margin="dense"
                                name="last_name"
                                label="Last Name"
                                type="text"
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                        }

                        {Array.of(tableType.TEAM).includes(table) &&
                            <TextField
                                margin="dense"
                                name="celeb_id"
                                label="Celeb"
                                type="text"
                                value={formData.celeb_id}
                                onChange={handleChange}
                            />
                        }

                        {/* {Array.of(tableType.TEAM).includes(table) &&
                            <TextField
                                margin="dense"
                                name="celeb_id"
                                label="Celeb"
                                type="text"
                                select
                                value={formData.celeb_id}
                                onChange={handleChange}
                            >
                                {celebs.map((celeb, index) => (
                                    <MenuItem key={index} value={celeb.id}>{celeb.first_name}</MenuItem>
                                ))}
                            </TextField>
                        } */}

                        {Array.of(tableType.TEAM).includes(table) &&
                            <TextField
                                margin="dense"
                                name="pro_id"
                                label="Pro"
                                type="text"
                                value={formData.pro_id}
                                onChange={handleChange}
                            />
                        }

                        {Array.of(tableType.TEAM).includes(table) &&
                            <TextField
                                margin="dense"
                                name="mentor_id"
                                label="Mentor"
                                type="text"
                                value={formData.mentor_id}
                                onChange={handleChange}
                            />
                        }

                        {Array.of(tableType.TEAM).includes(table) &&
                            <TextField
                                margin="dense"
                                name="season_id"
                                label="Season"
                                type="text"
                                value={formData.season_id}
                                onChange={handleChange}
                            />
                        }

                        {Array.of(tableType.TEAM).includes(table) &&
                            <TextField
                                margin="dense"
                                name="placement"
                                label="Placement"
                                type="text"
                                select
                                value={formData.placement}
                                onChange={handleChange}
                            >
                                {placements.map((placement, index) => (
                                    <MenuItem key={index} value={placement}>{placement}</MenuItem>
                                ))}
                            </TextField>
                        }

                        {Array.of(tableType.TEAM).includes(table) &&
                            <TextField
                                margin="dense"
                                name="team_name"
                                label="Team Name"
                                type="text"
                                value={formData.team_name}
                                onChange={handleChange}
                            />
                        }

                        {Array.of(tableType.TEAM).includes(table) &&
                            <TextField
                                margin="dense"
                                name="extra"
                                label="Extra"
                                type="text"
                                value={formData.extra}
                                onChange={handleChange}
                            />
                        }

                        {Array.of('Celeb', 'Pro').includes(table) &&
                            <MobileDatePicker
                                margin="dense"
                                label="Birthday"
                                inputFormat="MM/dd/yyyy"
                                value={formData.birthday}
                                onChange={handleBirthday}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        }

                        {Array.of('Celeb', 'Pro').includes(table) &&
                            <TextField
                                margin="dense"
                                name="height"
                                label="Height (_'__)"
                                type="text"
                                value={formData.height}
                                onChange={handleChange}
                            />
                        }

                        {Array.of('Celeb', 'Pro').includes(table) &&
                            <TextField
                                margin="dense"
                                name="gender"
                                label="Gender"
                                type="text"
                                select
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                {genders.map((gender, index) => (
                                    <MenuItem key={index} value={gender}>{gender}</MenuItem>
                                ))}
                            </TextField>
                        }

                        {Array.of('Celeb', 'Pro').includes(table) &&
                            <TextField
                                margin="dense"
                                name="instagram"
                                label="Instagram Username"
                                type="text"
                                value={formData.instagram}
                                onChange={handleChange}
                            />
                        }

                        {Array.of('Celeb', 'Pro').includes(table) &&
                            <TextField
                                margin="dense"
                                name="twitter"
                                label="Twitter Username"
                                type="text"
                                value={formData.twitter}
                                onChange={handleChange}
                            />
                        }

                        {Array.of('Celeb', 'Pro').includes(table) &&
                            <TextField
                                margin="dense"
                                name="tiktok"
                                label="TikTok Username"
                                type="text"
                                value={formData.tiktok}
                                onChange={handleChange}
                            />
                        }

                        {Array.of('Celeb', 'Pro').includes(table) &&
                            <TextField
                                margin="dense"
                                name="is_junior"
                                select
                                label="Junior?"
                                value={formData.is_junior}
                                onChange={handleChange}
                            >
                                <MenuItem key={1} value={true}>Yes</MenuItem>
                                <MenuItem key={2} value={false}>No</MenuItem>
                            </TextField>
                        }

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant="contained" color="error">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} variant="contained" color="primary">
                            Add {table}
                        </Button>
                    </DialogActions>
                </Dialog>
            </LocalizationProvider>
        </div>
    )
}

export default AddDialog;