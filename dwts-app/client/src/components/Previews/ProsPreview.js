import React from "react";
import styled from "styled-components";

function ProsPreview(props) {

    return (
        <Preview>
            <CoverPhoto src={props.pro.promoPic} />
            <Text>{props.pro.name}</Text>
        </Preview>
    )
}

const Preview = styled.div`
    width: 100%;
`;

const CoverPhoto = styled.img`
    width: 125px;
    height: 125px;
    border-radius: 10px;
`;

const Text = styled.h3`
    font-size: 12px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.7);
    margin: 1px;
    padding: 0 5px;
    letter-spacing: 0.05em;
    color: white;
`;

export default ProsPreview;