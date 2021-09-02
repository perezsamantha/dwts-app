
import styled from 'styled-components';

export const Container = styled.div`
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
    padding-bottom: 70px;
`;

export const TeamName = styled.h4`
font-size: 20px;
font-weight: 500;
margin: 5px auto;
color: rgba(0, 0, 0, 0.6);
`;