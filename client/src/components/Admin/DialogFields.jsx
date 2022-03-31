import React, { useEffect, useState } from 'react';
import {
    MenuItem,
    TextField,
    Avatar,
    InputAdornment,
    Autocomplete,
    Box,
} from '@mui/material';
import { MobileDatePicker } from '@mui/lab';

import * as tableType from '../../constants/tableTypes';
import {
    genders,
    placements,
    weeks,
    styles,
    themes,
    runningOrders,
    scores,
    scoreOrders,
    roles,
    heightsInInches,
} from '../../constants/dropdowns';
import CoverPicUpload from '../shared/CoverPicUpload';
import { PhotoContainer } from '../shared/regStyles';
import { useSelector } from 'react-redux';
import DataGetter from '../shared/DataGetter';
import { convertHeight, getFullName } from '../shared/functions';

function DialogFields(props) {
    const {
        formData,
        setFormData,
        table,
        handleChange,
        handleBirthday,
        handleDate,
    } = props;
    const celebs = useSelector((state) => state.celebs.celebs);
    const pros = useSelector((state) => state.pros.pros);
    const seasons = useSelector((state) => state.seasons.seasons);
    const episodes = useSelector((state) => state.episodes.episodes);
    const judges = useSelector((state) => state.judges.judges);
    const dances = useSelector((state) => state.dances.dances);
    const teams = useSelector((state) => state.teams.teams);
    const tours = useSelector((state) => state.tours.tours);

    const [autoValues, setAutoValues] = useState({
        celeb: null,
        pro: null,
        mentor: null,
    });

    useEffect(() => {}, []);

    return (
        <>
            {Array.of(
                tableType.CELEB,
                tableType.PRO,
                tableType.SEASON,
                tableType.TEAM,
                tableType.TOUR,
                tableType.USER,
                tableType.AUTH
            ).includes(table) &&
                props.dialog === 'Edit' && (
                    <PhotoContainer>
                        <Avatar
                            sx={{ width: 150, height: 150 }}
                            src={formData?.cover_pic}
                        />

                        <CoverPicUpload
                            editor={props.editor}
                            setEditor={props.setEditor}
                            fileData={props.fileData}
                            setFileData={props.setFileData}
                        />
                    </PhotoContainer>
                )}

            {Array.of(tableType.CELEB, tableType.PRO, tableType.JUDGE).includes(
                table
            ) && (
                <TextField
                    margin="dense"
                    name="first_name"
                    label="First Name"
                    type="text"
                    value={formData.first_name || ''}
                    onChange={handleChange}
                />
            )}

            {Array.of(tableType.CELEB, tableType.PRO, tableType.JUDGE).includes(
                table
            ) && (
                <TextField
                    margin="dense"
                    name="last_name"
                    label="Last Name"
                    type="text"
                    value={formData.last_name || ''}
                    onChange={handleChange}
                />
            )}

            {/* change to dropdown of constants */}
            {/* {Array.of(tableType.SEASON).includes(table) &&
                <TextField
                    margin="dense"
                    name="number"
                    label="Number"
                    type="text"
                    value={formData.number || ''}
                    onChange={handleChange}
                />
            } */}

            {Array.of(tableType.SEASON).includes(table) && (
                <TextField
                    margin="dense"
                    name="id"
                    label="Number"
                    type="text"
                    value={formData.id || ''}
                    onChange={handleChange}
                />
            )}

            {Array.of(tableType.TOUR).includes(table) && (
                <TextField
                    margin="dense"
                    name="name"
                    label="Name"
                    type="text"
                    value={formData.name || ''}
                    onChange={handleChange}
                />
            )}

            {Array.of(tableType.SCORE, tableType.DANCER).includes(table) && (
                <TextField
                    margin="dense"
                    name="dance_id"
                    label="Dance"
                    type="text"
                    select
                    value={formData.dance_id || ''}
                    onChange={handleChange}
                >
                    {dances.map((dance, index) => {
                        return (
                            <MenuItem key={index} value={dance.id}>
                                <DataGetter
                                    id={dance.id}
                                    type={tableType.DANCE}
                                />
                            </MenuItem>
                        );
                    })}
                </TextField>
            )}

            {Array.of(tableType.DANCER).includes(table) && (
                <TextField
                    margin="dense"
                    name="team_id"
                    label="Team"
                    type="text"
                    select
                    value={formData.team_id || ''}
                    onChange={handleChange}
                >
                    {teams.map((team, index) => {
                        return (
                            <MenuItem key={index} value={team.id}>
                                <DataGetter
                                    id={team.id}
                                    type={tableType.TEAM}
                                />
                            </MenuItem>
                        );
                    })}
                </TextField>
            )}

            {Array.of(tableType.TOURCAST).includes(table) && (
                <TextField
                    margin="dense"
                    name="tour_id"
                    label="Tour"
                    type="text"
                    select
                    value={formData.tour_id || ''}
                    onChange={handleChange}
                >
                    {tours.map((tour, index) => {
                        return (
                            <MenuItem key={index} value={tour.id}>
                                <DataGetter
                                    id={tour.id}
                                    type={tableType.TOUR}
                                />
                            </MenuItem>
                        );
                    })}
                </TextField>
            )}

            {Array.of(
                tableType.TEAM,
                tableType.DANCER,
                tableType.TOURCAST
            ).includes(table) && (
                <Autocomplete
                    name="celeb_id"
                    options={celebs}
                    autoHighlight
                    value={autoValues.celeb}
                    getOptionLabel={(option) =>
                        option?.last_name
                            ? `${option.first_name} ${option.last_name}`
                            : option?.first_name
                            ? `${option.first_name}`
                            : ''
                    }
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            {option.first_name} {option.last_name}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField margin="dense" {...params} label="Celeb" />
                    )}
                    onChange={(e, newValue) => {
                        setFormData({
                            ...formData,
                            celeb_id: newValue?.id,
                        });
                        setAutoValues({ ...autoValues, celeb: newValue });
                    }}
                />
            )}

            {Array.of(
                tableType.TEAM,
                tableType.DANCER,
                tableType.TOURCAST
            ).includes(table) && (
                <Autocomplete
                    name="pro_id"
                    options={pros}
                    autoHighlight
                    value={autoValues.pro}
                    getOptionLabel={(option) =>
                        option?.last_name
                            ? `${option.first_name} ${option.last_name}`
                            : option?.first_name
                            ? `${option.first_name}`
                            : ''
                    }
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            {option.first_name} {option.last_name}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField margin="dense" {...params} label="Pro" />
                    )}
                    onChange={(e, newValue) => {
                        setFormData({
                            ...formData,
                            pro_id: newValue?.id,
                        });
                        setAutoValues({ ...autoValues, pro: newValue });
                    }}
                />
            )}

            {Array.of(tableType.TEAM).includes(table) && (
                <Autocomplete
                    name="mentor_id"
                    options={pros}
                    autoHighlight
                    value={autoValues.mentor}
                    getOptionLabel={(option) =>
                        option?.last_name
                            ? `${option.first_name} ${option.last_name}`
                            : option?.first_name
                            ? `${option.first_name}`
                            : ''
                    }
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            {option.first_name} {option.last_name}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField margin="dense" {...params} label="Mentor" />
                    )}
                    onChange={(e, newValue) => {
                        setFormData({
                            ...formData,
                            mentor_id: newValue?.id,
                        });
                        setAutoValues({
                            ...autoValues,
                            mentor: newValue,
                        });
                    }}
                />
            )}

            {Array.of(
                tableType.TEAM,
                tableType.EPISODE,
                tableType.TOUR
            ).includes(table) && (
                <TextField
                    margin="dense"
                    name="season_id"
                    label="Season"
                    type="text"
                    select
                    value={formData.season_id || ''}
                    onChange={handleChange}
                >
                    {seasons.map((season, index) => {
                        return (
                            <MenuItem key={index} value={season.id}>
                                <DataGetter
                                    id={season.id}
                                    type={tableType.SEASON}
                                />
                            </MenuItem>
                        );
                    })}
                </TextField>
            )}

            {Array.of(tableType.TEAM).includes(table) && (
                <TextField
                    margin="dense"
                    name="placement"
                    label="Placement"
                    type="text"
                    select
                    value={formData.placement || ''}
                    onChange={handleChange}
                >
                    {placements.map((placement, index) => (
                        <MenuItem key={index} value={placement}>
                            {placement}
                        </MenuItem>
                    ))}
                </TextField>
            )}

            {Array.of(tableType.TEAM).includes(table) && (
                <TextField
                    margin="dense"
                    name="team_name"
                    label="Team Name"
                    type="text"
                    value={formData.team_name || ''}
                    onChange={handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                #team
                            </InputAdornment>
                        ),
                    }}
                />
            )}

            {/* share getEp# function? */}
            {Array.of(tableType.DANCE).includes(table) && (
                <TextField
                    margin="dense"
                    name="episode_id"
                    label="Episode"
                    type="text"
                    select
                    value={formData.episode_id || ''}
                    onChange={handleChange}
                >
                    {episodes.map((episode, index) => {
                        return (
                            <MenuItem key={index} value={episode.id}>
                                <DataGetter
                                    id={episode.id}
                                    type={tableType.EPISODE}
                                />
                            </MenuItem>
                        );
                    })}
                </TextField>
            )}

            {Array.of(tableType.DANCE).includes(table) && (
                <TextField
                    margin="dense"
                    name="style"
                    label="Style"
                    type="text"
                    select
                    value={formData.style || ''}
                    onChange={handleChange}
                >
                    {styles.map((style, index) => (
                        <MenuItem key={index} value={style}>
                            {style}
                        </MenuItem>
                    ))}
                </TextField>
            )}

            {Array.of(tableType.DANCE).includes(table) && (
                <TextField
                    margin="dense"
                    name="song_title"
                    label="Song Title"
                    type="text"
                    value={formData.song_title || ''}
                    onChange={handleChange}
                />
            )}

            {Array.of(tableType.DANCE).includes(table) && (
                <TextField
                    margin="dense"
                    name="song_artist"
                    label="Song Artist"
                    type="text"
                    value={formData.song_artist || ''}
                    onChange={handleChange}
                />
            )}

            {Array.of(tableType.DANCE).includes(table) && (
                <TextField
                    margin="dense"
                    name="running_order"
                    label="Running Order"
                    type="text"
                    select
                    value={formData.running_order || ''}
                    onChange={handleChange}
                >
                    {runningOrders.map((ro, index) => (
                        <MenuItem key={index} value={ro}>
                            {ro}
                        </MenuItem>
                    ))}
                </TextField>
            )}

            {Array.of(tableType.DANCE).includes(table) && (
                <TextField
                    margin="dense"
                    name="is_main"
                    select
                    label="Main Dance?"
                    value={formData.is_main}
                    onChange={handleChange}
                >
                    <MenuItem key={1} value={true}>
                        Yes
                    </MenuItem>
                    <MenuItem key={2} value={false}>
                        No
                    </MenuItem>
                </TextField>
            )}

            {Array.of(tableType.DANCE).includes(table) && (
                <TextField
                    margin="dense"
                    name="link"
                    label="Link"
                    type="text"
                    value={formData.link || ''}
                    onChange={handleChange}
                />
            )}

            {Array.of(tableType.DANCE).includes(table) && (
                <MobileDatePicker
                    margin="dense"
                    label="Daily Date"
                    inputFormat="MM/dd/yyyy"
                    value={formData.daily_date || null}
                    onChange={(date) =>
                        setFormData({ ...formData, daily_date: date })
                    }
                    renderInput={(params) => <TextField {...params} />}
                />
            )}

            {Array.of(tableType.DANCER).includes(table) && (
                <TextField
                    margin="dense"
                    name="is_background"
                    select
                    label="Background Dancer?"
                    value={formData.is_background}
                    onChange={handleChange}
                >
                    <MenuItem key={1} value={true}>
                        Yes
                    </MenuItem>
                    <MenuItem key={2} value={false}>
                        No
                    </MenuItem>
                </TextField>
            )}

            {Array.of(tableType.TOUR).includes(table) && (
                <MobileDatePicker
                    margin="dense"
                    label="First Show"
                    inputFormat="MM/dd/yyyy"
                    value={formData.first_show || null}
                    onChange={(date) =>
                        setFormData({ ...formData, first_show: date })
                    }
                    renderInput={(params) => <TextField {...params} />}
                />
            )}

            {Array.of(tableType.TOUR).includes(table) && (
                <MobileDatePicker
                    margin="dense"
                    label="Last Show"
                    inputFormat="MM/dd/yyyy"
                    value={formData.last_show || ''}
                    onChange={(date) =>
                        setFormData({ ...formData, last_show: date })
                    }
                    renderInput={(params) => <TextField {...params} />}
                />
            )}

            {Array.of(tableType.TOUR).includes(table) && (
                <TextField
                    margin="dense"
                    name="num_shows"
                    label="# Shows"
                    type="text"
                    value={formData.num_shows || ''}
                    onChange={handleChange}
                />
            )}

            {Array.of(tableType.TOURCAST).includes(table) && (
                <TextField
                    margin="dense"
                    name="is_swing"
                    select
                    label="Swing Dancer?"
                    value={formData.is_swing}
                    onChange={handleChange}
                >
                    <MenuItem key={1} value={true}>
                        Yes
                    </MenuItem>
                    <MenuItem key={2} value={false}>
                        No
                    </MenuItem>
                </TextField>
            )}

            {/* EXTRA */}
            {Array.of(
                tableType.SEASON,
                tableType.TEAM,
                tableType.DANCE,
                tableType.DANCER,
                tableType.TOUR,
                tableType.TOURCAST
            ).includes(table) && (
                <TextField
                    margin="dense"
                    name="extra"
                    label="Extra"
                    type="text"
                    value={formData.extra || ''}
                    onChange={handleChange}
                />
            )}

            {Array.of(tableType.CELEB, tableType.PRO, tableType.JUDGE).includes(
                table
            ) && (
                <MobileDatePicker
                    margin="dense"
                    label="Birthday"
                    inputFormat="MM/dd/yyyy"
                    value={formData.birthday || null}
                    onChange={handleBirthday}
                    renderInput={(params) => <TextField {...params} />}
                />
            )}

            {Array.of(tableType.EPISODE).includes(table) && (
                <TextField
                    margin="dense"
                    name="week"
                    label="Week"
                    type="text"
                    select
                    value={formData.week || ''}
                    onChange={handleChange}
                >
                    {weeks.map((week, index) => (
                        <MenuItem key={index} value={week}>
                            {week}
                        </MenuItem>
                    ))}
                </TextField>
            )}

            {Array.of(tableType.EPISODE).includes(table) && (
                <TextField
                    margin="dense"
                    name="night"
                    select
                    label="Night"
                    value={formData.night || ''}
                    onChange={handleChange}
                >
                    <MenuItem key={1} value={1}>
                        1
                    </MenuItem>
                    <MenuItem key={2} value={2}>
                        2
                    </MenuItem>
                </TextField>
            )}

            {Array.of(tableType.EPISODE).includes(table) && (
                <TextField
                    margin="dense"
                    name="theme"
                    label="Theme"
                    type="text"
                    select
                    value={formData.theme || ''}
                    onChange={handleChange}
                >
                    {themes.map((theme, index) => (
                        <MenuItem key={index} value={theme}>
                            {theme}
                        </MenuItem>
                    ))}
                </TextField>
            )}

            {Array.of(tableType.EPISODE).includes(table) && (
                <MobileDatePicker
                    margin="dense"
                    label="Date"
                    inputFormat="MM/dd/yyyy"
                    value={formData.date || null}
                    onChange={handleDate}
                    renderInput={(params) => <TextField {...params} />}
                />
            )}

            {Array.of(tableType.CELEB, tableType.PRO).includes(table) && (
                <TextField
                    margin="dense"
                    name="height"
                    label="Height"
                    type="text"
                    select
                    value={formData.height || ''}
                    onChange={handleChange}
                >
                    {heightsInInches.map((height, index) => (
                        <MenuItem key={index} value={height}>
                            {convertHeight(height)}
                        </MenuItem>
                    ))}
                </TextField>
            )}

            {Array.of(tableType.CELEB, tableType.PRO).includes(table) && (
                <TextField
                    margin="dense"
                    name="gender"
                    label="Gender"
                    type="text"
                    select
                    value={formData.gender || ''}
                    onChange={handleChange}
                >
                    {genders.map((gender, index) => (
                        <MenuItem key={index} value={gender}>
                            {gender}
                        </MenuItem>
                    ))}
                </TextField>
            )}

            {Array.of(tableType.USER).includes(table) && (
                <TextField
                    margin="dense"
                    name="username"
                    label="Username"
                    type="text"
                    value={formData.username || ''}
                    onChange={handleChange}
                />
            )}

            {Array.of(tableType.USER).includes(table) && (
                <TextField
                    margin="dense"
                    name="email"
                    label="Email"
                    type="text"
                    value={formData.email || ''}
                    onChange={handleChange}
                />
            )}

            {/* checkbox? */}
            {Array.of(tableType.USER).includes(table) && (
                <TextField
                    margin="dense"
                    name="email_verified"
                    select
                    label="Email Verified?"
                    value={formData.email_verified}
                    onChange={handleChange}
                >
                    <MenuItem key={1} value={true}>
                        Yes
                    </MenuItem>
                    <MenuItem key={2} value={false}>
                        No
                    </MenuItem>
                </TextField>
            )}

            {Array.of(tableType.AUTH).includes(table) && (
                <TextField
                    margin="dense"
                    name="username"
                    label="Username"
                    type="text"
                    value={formData.username || ''}
                    onChange={handleChange}
                />
            )}

            {Array.of(tableType.USER, tableType.AUTH).includes(table) && (
                <TextField
                    margin="dense"
                    name="nickname"
                    label="Nickname"
                    type="text"
                    value={formData.nickname || ''}
                    onChange={handleChange}
                />
            )}

            {Array.of(tableType.USER, tableType.AUTH).includes(table) && (
                <TextField
                    margin="dense"
                    name="watching_since"
                    label="Watching Since"
                    type="text"
                    select
                    value={formData.watching_since || ''}
                    onChange={handleChange}
                >
                    {seasons.map((season, index) => {
                        return (
                            <MenuItem key={index} value={season.id}>
                                {season.id}
                            </MenuItem>
                        );
                    })}
                </TextField>
            )}

            {Array.of(
                tableType.CELEB,
                tableType.PRO,
                tableType.USER,
                tableType.AUTH
            ).includes(table) && (
                <TextField
                    margin="dense"
                    name="instagram"
                    label="Instagram Username"
                    type="text"
                    value={formData.instagram || ''}
                    onChange={handleChange}
                />
            )}

            {Array.of(
                tableType.CELEB,
                tableType.PRO,
                tableType.USER,
                tableType.AUTH
            ).includes(table) && (
                <TextField
                    margin="dense"
                    name="twitter"
                    label="Twitter Username"
                    type="text"
                    value={formData.twitter || ''}
                    onChange={handleChange}
                />
            )}

            {Array.of(tableType.CELEB, tableType.PRO, tableType.USER).includes(
                table
            ) && (
                <TextField
                    margin="dense"
                    name="tiktok"
                    label="TikTok Username"
                    type="text"
                    value={formData.tiktok || ''}
                    onChange={handleChange}
                />
            )}

            {Array.of(tableType.CELEB, tableType.PRO).includes(table) && (
                <TextField
                    margin="dense"
                    name="is_junior"
                    select
                    label="Junior?"
                    value={formData.is_junior}
                    onChange={handleChange}
                >
                    <MenuItem key={1} value={true}>
                        Yes
                    </MenuItem>
                    <MenuItem key={2} value={false}>
                        No
                    </MenuItem>
                </TextField>
            )}

            {Array.of(tableType.SCORE).includes(table) && (
                <TextField
                    margin="dense"
                    name="judge_id"
                    label="Judge"
                    type="text"
                    select
                    value={formData.judge_id || ''}
                    onChange={handleChange}
                >
                    {judges.map((judge, index) => {
                        return (
                            <MenuItem key={index} value={judge.id}>
                                {getFullName(judge)}
                            </MenuItem>
                        );
                    })}
                </TextField>
            )}

            {Array.of(tableType.SCORE).includes(table) && (
                <TextField
                    margin="dense"
                    name="value"
                    label="Value"
                    type="text"
                    select
                    value={formData.value || ''}
                    onChange={handleChange}
                >
                    {scores.map((score, index) => (
                        <MenuItem key={index} value={score}>
                            {score}
                        </MenuItem>
                    ))}
                </TextField>
            )}

            {Array.of(tableType.SCORE).includes(table) && (
                <TextField
                    margin="dense"
                    name="order"
                    label="Order Given"
                    type="text"
                    select
                    value={formData.order || ''}
                    onChange={handleChange}
                >
                    {scoreOrders.map((so, index) => (
                        <MenuItem key={index} value={so}>
                            {so}
                        </MenuItem>
                    ))}
                </TextField>
            )}

            {Array.of(tableType.SCORE).includes(table) && (
                <TextField
                    margin="dense"
                    name="is_guest"
                    select
                    label="Guest Judge?"
                    value={formData.is_guest}
                    onChange={handleChange}
                >
                    <MenuItem key={1} value={true}>
                        Yes
                    </MenuItem>
                    <MenuItem key={2} value={false}>
                        No
                    </MenuItem>
                </TextField>
            )}

            {Array.of(tableType.USER).includes(table) && (
                <MobileDatePicker
                    margin="dense"
                    label="Birthday"
                    inputFormat="MM/dd/yyyy"
                    value={formData.birthday || null}
                    onChange={handleBirthday}
                    renderInput={(params) => <TextField {...params} />}
                />
            )}

            {Array.of(tableType.USER).includes(table) && (
                <TextField
                    margin="dense"
                    name="user_role"
                    label="Role"
                    type="text"
                    select
                    value={formData.user_role || ''}
                    onChange={handleChange}
                >
                    {roles.map((role, index) => (
                        <MenuItem key={index} value={role}>
                            {role}
                        </MenuItem>
                    ))}
                </TextField>
            )}

            {Array.of(tableType.USER).includes(table) &&
                props.dialog === 'Add' && (
                    <TextField
                        margin="dense"
                        name="password"
                        label="Password"
                        type="text"
                        value={formData.password || ''}
                        onChange={handleChange}
                    />
                )}

            {Array.of(tableType.USER).includes(table) &&
                props.dialog === 'Add' && (
                    <TextField
                        margin="dense"
                        name="confirm_password"
                        label="Confirm Password"
                        type="text"
                        value={formData.confirm_password || ''}
                        onChange={handleChange}
                    />
                )}
        </>
    );
}

export default DialogFields;
