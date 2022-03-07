import React, { useState, useEffect } from 'react';
import { FileInput, HiddenInput, Label, UploadContainer } from './regStyles';
import AvatarEditor from 'react-avatar-editor';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Slider } from '@mui/material';

function CoverPicUpload(props) {
    const [scaleValue, setScaleValue] = useState(10);
    const { fileData, setFileData, setEditor } = props;

    useEffect(() => {
        setScaleValue(1);
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
        <UploadContainer>
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
                {fileData != null && (
                    <UploadContainer>
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
                            sx={{ width: 200, marginTop: 1 }}
                            value={scaleValue}
                            onChange={handleScale}
                            min={1}
                            max={5}
                            step={0.01}
                        />
                    </UploadContainer>
                )}
            </FileInput>
        </UploadContainer>
    );
}

export default CoverPicUpload;
