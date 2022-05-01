import React, { useState, useEffect } from 'react';
import { FileInput, HiddenInput, Label } from './regStyles';
import AvatarEditor from 'react-avatar-editor';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Slider, Stack } from '@mui/material';

function CoverPicUpload(props) {
    const [scaleValue, setScaleValue] = useState(1);
    const { fileData, setFileData, setEditor } = props;

    useEffect(() => {
        //setScaleValue(1);
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
                            borderRadius={100}
                            border={0}
                            scale={scaleValue}
                            ref={setEditorRef}
                        />
                        <Slider
                            sx={{ width: 200 }}
                            value={scaleValue}
                            onChange={handleScale}
                            onChangeCommitted={handleScale}
                            min={1}
                            max={2}
                            step={0.01}
                        />
                    </Stack>
                )}
            </FileInput>
        </Stack>
    );
}

export default CoverPicUpload;
