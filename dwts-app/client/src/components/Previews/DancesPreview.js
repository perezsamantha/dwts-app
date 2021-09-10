import React from 'react';
import styled from 'styled-components';

function DancesPreview(props) {
    
    return (
        <Preview>
            <Text>testing</Text>
        </Preview>
    )
}

const Preview = styled.div`
    width: 100%;
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

export default DancesPreview;