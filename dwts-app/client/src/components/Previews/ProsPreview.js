import React from "react";
import { Names, Preview, PreviewPhoto } from "../shared/shared";

function ProsPreview(props) {

    return (
        <Preview>
            <PreviewPhoto src={props.pro.coverPic ? props.pro.coverPic : "/defaultPic.jpeg"} />
            <Names>{props.pro.name}</Names>
        </Preview>
    )
}

export default ProsPreview;