import React from "react";
import { Names, Preview, PreviewPhoto } from "../shared/shared";

function ProsPreview(props) {

    const pro = props.pro;

    return (
        <Preview>
            <PreviewPhoto src={pro.cover_pic ? pro.cover_pic : "/defaultPic.jpeg"} />
            <Names>{pro.first_name} {pro.last_name}</Names>
        </Preview>
    )
}

export default ProsPreview;