import React, { useState, useEffect } from 'react';
import { FileInput, HiddenInput, Label } from './regStyles';
import AvatarEditor from 'react-avatar-editor';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Button, Slider, Stack } from '@mui/material';
import * as tableType from '../../constants/tableTypes';
import { addTeamPic } from '../../actions/teams';
import { addProPic } from '../../actions/pros';
import { useDispatch } from 'react-redux';
import { addDancePic } from '../../actions/dances';

const pica = require('pica')();

function ExtraPicUpload(props) {
    const [fileData, setFileData] = useState(null);
    const [scaleValue, setScaleValue] = useState(1);
    const [editor, setEditor] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        //setScaleValue(1);
        setFileData(null);
    }, []);

    const handleFile = (e) => {
        setFileData(e.target.files[0]);
    };

    const handleScale = (e, newValue) => {
        e.preventDefault();
        setScaleValue(newValue);
    };

    const setEditorRef = (editor) => {
        setEditor(editor);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editor != null) {
            const data = new FormData();

            // const canvas = editor.getImageScaledToCanvas();
            //const canvas = editor.getImage();

            const img = editor.getImage();
            var canvas = document.createElement('canvas');

            canvas.width = 400;
            canvas.height = 400;

            const picaCanvas = await pica.resize(img, canvas);

            picaCanvas.toBlob(function (blob) {
                data.append('pictures', blob, `${Date.now()}-${fileData.name}`);
                switch (props.type) {
                    case tableType.TEAM:
                        dispatch(addTeamPic(props.id, data));
                        break;
                    case tableType.PRO:
                        dispatch(addProPic(props.id, data));
                        break;
                    case tableType.DANCE:
                        dispatch(addDancePic(props.id, data));
                        break;
                    default:
                }
                setFileData(null);
            });
        }
    };

    return (
        <Stack alignItems="center" spacing={1}>
            <HiddenInput
                type="file"
                accept=".jpeg, .jpg, .png"
                onChange={handleFile}
                id="file"
            />
            <Label htmlFor="file">
                <AddAPhotoIcon sx={{ cursor: 'pointer' }} />
            </Label>
            <FileInput>
                {fileData != null && (
                    <Stack alignItems="center" spacing={1}>
                        <AvatarEditor
                            image={fileData}
                            width={200}
                            height={200}
                            borderRadius={15}
                            border={0}
                            scale={scaleValue}
                            ref={setEditorRef}
                        />
                        <Slider
                            sx={{ width: 200, marginTop: 1 }}
                            value={scaleValue}
                            onChange={handleScale}
                            onChangeCommitted={handleScale}
                            min={1}
                            max={2}
                            step={0.01}
                        />
                        <Button variant="filled" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Stack>
                )}
            </FileInput>
        </Stack>
    );
}

export default ExtraPicUpload;
