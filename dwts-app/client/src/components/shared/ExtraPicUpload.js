import React, { useState, useEffect } from "react";
import { FileInput, HiddenInput, Label, UploadContainer } from '../shared/shared';
import AvatarEditor from 'react-avatar-editor';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Button, Slider } from "@mui/material";
import * as tableType from '../../constants/tableTypes';
import { addTeamPic } from "../../actions/teams";
import { addProPic } from '../../actions/pros';
import { useDispatch } from "react-redux";

function ExtraPicUpload(props) {
    const [fileData, setFileData] = useState(null);
    const [scaleValue, setScaleValue] = useState(10);
    const [editor, setEditor] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        setScaleValue(1);
        setFileData(null);

    }, []);

    const handleFile = (e) => {
        setFileData(e.target.files[0]);
    }

    const handleScale = (e, newValue) => {
        e.preventDefault();
        setScaleValue(newValue);
    }

    const setEditorRef = (editor) => {
        setEditor(editor);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editor != null) {
            const data = new FormData();

            const canvas = editor.getImageScaledToCanvas();

            canvas.toBlob(function (blob) {
                data.append("pictures", blob, `${Date.now()}-${fileData.name}`);
                switch (props.type) {
                    case tableType.TEAM:
                        dispatch(addTeamPic(props.id, data));
                        break
                    case tableType.PRO:
                        dispatch(addProPic(props.id, data));
                        break
                }
                setFileData(null);
            })
        }
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
                {/* <Button> */}
                    <AddAPhotoIcon />
                {/* </Button> */}
            </Label>
            <FileInput>
                {fileData != null && <UploadContainer>
                    <AvatarEditor
                        image={fileData}
                        width={200}
                        height={200}
                        borderRadius={15}
                        border={0}
                        scale={scaleValue}
                        ref={setEditorRef}
                    />
                    <Slider sx={{ width: 200, marginTop: 1 }} value={scaleValue} onChange={handleScale} min={1} max={5} step={0.01} />
                    <Button variant="filled" onClick={handleSubmit}>Submit</Button>
                </UploadContainer>}
            </FileInput>
        </UploadContainer>
    )

}

export default ExtraPicUpload;