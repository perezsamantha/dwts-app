import styled from '@emotion/styled';
import { TextField, Typography } from '@mui/material';

export const FullTextField = styled(TextField)({
    width: '100%',
    //padding: 10,
});

export const HeaderText = styled(Typography)(({ theme }) => ({
    color: 'white',
    textShadow: `5px 5px 15px rgba(0, 0, 0, 0.4)`,
    zIndex: 10,
}));

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
    color: rgb(198, 161, 67);
    font-weight: 500;
    text-decoration: none;
`;

// export const SubmitButton = styled.button`
//     width: 100%;
//     padding: 11px 20%;
//     color: #fff;
//     font-size: 15px;
//     font-weight: 600;
//     border: none;
//     border-radius: 100px 100px 100px 100px;
//     cursor: pointer;
//     transition: all, 240ms ease-in-out;
//     background: rgb(236, 220, 141);
//     background: radial-gradient(
//         circle,
//         rgba(236, 220, 141, 1) 0%,
//         rgba(208, 174, 87, 1) 100%
//     );
//     margin: 1em 0;

//     &:hover {
//         filter: brightness(1.03);
//     }
// `;

export const SubmitButton = styled('button')({
    height: 60,
    width: 60,
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#fae27a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all, 240ms ease-in-out',
    cursor: 'pointer',
});
