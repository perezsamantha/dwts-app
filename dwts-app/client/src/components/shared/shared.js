
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
    overflow-x: hidden;
    text-align: center;
    padding: 30px 0 70px 0;
`;

export const TeamName = styled.h4`
    font-size: 25px;
    font-weight: 500;
    margin: 10px auto 5px auto;
    color: white;
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
    color: rgba(0, 0, 0, 0.7);
    margin: 2px 0;
    padding: 0 1px;
    letter-spacing: 0.05em;
    color: white;
    max-width: 85%;
`;

export const Details = styled.h4`
    font-size: 10px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.5);
    margin: 2px 0;
    padding: 0 1px;
    letter-spacing: 0.05em;
    color: rgb(179, 179, 179);
    max-width: 85%;
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