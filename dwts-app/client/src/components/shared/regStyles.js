import styled from '@emotion/styled';

export const CardAvatar = styled.img`
    width: 175px;
    height: 175px;
    //margin: auto;
    border-radius: 15px;
    margin: 10px;
`;

export const LikesContainer = styled.div`
    margin: auto;
`;

export const Preview = styled.div`
    width: 100%;
`;

export const PreviewPhoto = styled.img`
    width: 125px;
    height: 125px;
    border-radius: 10px;
`;

export const Picture = styled.img`
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    position: relative;
    box-shadow: 1px 5px 15px lightgrey;
`;
export const SocialsRow = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

// for dialog forms

export const HiddenInput = styled.input`
    opacity: 0;
    width: 0.1px;
    height: 0.1px;
    position: absolute;
`;

export const Label = styled.label``;

export const FileInput = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    align-items: center;
`;

export const TableContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
    margin: auto;
`;

export const DataGridContainer = styled.div`
    height: 500px;
`;

export const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
`;

export const PhotoContainer = styled.div`
    display: flex;
    flex-direction: column;
    //margin-bottom: 15px;
    align-items: center;
`;

export const UploadContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px auto;
    align-items: center;
`;
