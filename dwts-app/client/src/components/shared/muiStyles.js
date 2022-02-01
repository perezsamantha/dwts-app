
import styled from "styled-components";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, InputLabel, Select, MenuItem, CircularProgress, FormControlLabel, Checkbox, ListItemText, Input, Chip, ListSubheader, Slider, Avatar } from '@mui/material';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import { KeyboardDatePicker } from "@material-ui/pickers";
import { makeStyles } from "@mui/styles";

export const AddButton = styled(Button)`
    min-height: 10px;
    min-width: 10px;
    max-height: 10px;
    max-width: 10px;
    color: grey;
`;

export const OpenSettings = styled(SettingsIcon)`
    color: lightgrey;
`;

export const AddJudge = styled(Button)`
    && { 
        margin: 15px auto 5px auto;
    }
`;

export const FormControl1 = styled(FormControl)`
    width: 96%;
    margin-right: 2%;
`;

export const TextField1 = styled(TextField)`
    width: 96%;
    margin-right: 2%;
`;

export const FormControl2 = styled(FormControl)`
    width: 47%;
    margin-right: 2%;
`;

export const TextField2 = styled(TextField)`
    width: 47%;
    margin-right: 2%;
`;

export const FormControl3 = styled(FormControl)`
    width: 31%;
    margin-right: 1.5%;
`;

export const FormControlJudge = styled(FormControl)`
    width: 58%;
    margin-right: 2%;
`;

export const FormControlScore = styled(FormControl)`
    width: 28%;
    margin-right: 2%;
`;

export const RemoveJudge = styled(CloseIcon)`
    width: 1%;
    color: grey;
    cursor: pointer;
    margin-top: 20px;
`;

export const ChipsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const IndividualChip = styled(Chip)`
    margin-right: 2px;
`;

export const KeyboardDatePicker2 = styled(KeyboardDatePicker)`
    width: 47%;
    margin-right: 2%;
`;