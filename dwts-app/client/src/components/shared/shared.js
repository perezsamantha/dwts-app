import { Paper } from '@mui/material';
import styled from 'styled-components';

export const Container = styled.div`
    width: 75%;
    min-height: 30%;
    max-height: 50%;
    z-index: 100;
    //box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    border-radius: 15px;
    overflow-y: auto;
    overflow-x: auto;
    text-align: center;
    padding: 30px 0 70px 0;
`;

export const CardContainer = styled(Paper)`
    width: 100%;
    min-height: 30%;
    max-height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    overflow-x: auto;
    text-align: center;
    padding: 30px 0 70px 0;
`;

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    //justify-content: center;
    //justify-items: center;
    margin: 0;
    //justify-content: space-between;
    //width: 80%;
`;

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

export const TeamName = styled.h4`
    font-size: 25px;
    font-weight: 500;
    margin: 10px auto 5px auto;
    //color: white;
`;

export const Preview = styled.div`
    width: 100%;
`;

export const PreviewPhoto = styled.img`
    width: 125px;
    height: 125px;
    border-radius: 10px;
`;

export const Names = styled.h3`
    font-size: 12px;
    font-weight: 500;
    //color: rgba(0, 0, 0, 0.7);
    margin: 2px 0;
    padding: 0 1px;
    letter-spacing: 0.05em;
    //color: white;
    max-width: 85%;
`;

export const Details = styled.h4`
    font-size: 10px;
    font-weight: 400;
    //color: rgba(0, 0, 0, 0.5);
    margin: 2px 0;
    padding: 0 1px;
    letter-spacing: 0.05em;
    //color: rgb(179, 179, 179);
    max-width: 85%;
    color: ${(props) => (props.lightMode ? 'red' : 'black')};
`;

/* const GridText = styled.h6`
    font-size: 15px;
    font-weight: 500;
    margin: 2px auto 10px auto;
    //color: lightgrey;
`;

const Season = styled.h5`
    font-size: 20px;
    font-weight: 500;
    margin: 5px auto;
    //color: lightgrey;
`;

const Placement = styled.h6`
    font-size: 15px;
    font-weight: 500;
    margin: 2px auto 10px auto;
    //color: grey;
`;

const LikeText = styled.h6`
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    color: white;
    margin: 10px 0;
`;

/*
const DanceText = styled.h6`
    font-size: 12px;
    font-weight: 500;
    margin: 5px 0;
    //color: lightgrey;
`;



const HiddenInput = styled.input`
    opacity: 0;
    width: 0.1px;
    height: 0.1px;
    position: absolute;
`;

const ContentContainer = styled.div`
    width: 100%;
    margin: 10px auto;
`;

const InnerContainer = styled.div`
    width: 100%;
`;

 */
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

// main container for search pages

export const ResultsContainer = styled.div`
    width: 100%;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    position: relative;
    padding-bottom: 70px;
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
