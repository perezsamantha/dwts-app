import styled from "styled-components";

export const BoxContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
`;

export const FormContainer = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    //box-shadow: 0px 0px 2.5px rgba(15, 15, 15, 0.19);
`;

export const MutedLink = styled.a`
    font-size: 12px;
    color: rgba(200, 200, 200, 0.8);
    font-weight: 500;
    text-decoration: none;
    text-align: center;
    margin: 1em 0;
`;

export const BoldLink = styled.a`
    font-size: 12px;
    color: rgb(9, 121, 87);
    font-weight: 500;
    text-decoration: none;
`;

export const SubmitButton = styled.button`
    width: 100%;
    padding: 11px 20%;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    border: none;
    border-radius: 100px 100px 100px 100px;
    cursor: pointer;
    transition: all, 240ms ease-in-out;
    background: rgb(9,121,87);
    background: linear-gradient(90deg, rgba(9,121,87,1) 0%, rgba(4,153,162,1) 60%, rgba(0,184,235,1) 100%);
    margin: 1em 0;

    &:hover {
        filter: brightness(1.03);
    }
`;