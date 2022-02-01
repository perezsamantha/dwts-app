import React, { useState, useEffect } from "react";
import { CoverPicSlider, FileInput, HiddenInput, Label, UploadContainer } from '../shared/shared';
import AvatarEditor from 'react-avatar-editor';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { Slider } from "@mui/material";

function CoverPicUpload(props) {
    //const [fileData, setFileData] = useState(props.fileData);
    const [scaleValue, setScaleValue] = useState(10);

    useEffect(() => {
        setScaleValue(1);
        props.setFileData(null);

    }, []);

    const handleFile = (e) => {
        props.setFileData(e.target.files[0]);
    }

    const handleScale = (e, newValue) => {
        e.preventDefault();
        setScaleValue(newValue);
    }

    //const [editor, setEditor] = useState(props.editor);

    const setEditorRef = (editor) => {
        props.setEditor(editor);
    }

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
                {props.fileData != null && <UploadContainer>
                    <AvatarEditor
                        image={props.fileData}
                        width={200}
                        height={200}
                        borderRadius={100}
                        border={0}
                        scale={scaleValue}
                        ref={setEditorRef}
                    />
                    <Slider sx={{ width: 200 }} value={scaleValue} onChange={handleScale} min={1} max={5} step={0.01} />
                </UploadContainer>}
            </FileInput>
        </UploadContainer>
    )

}

export default CoverPicUpload;