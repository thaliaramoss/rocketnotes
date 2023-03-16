import styled from "styled-components";
import { Link } from 'react-router-dom'

export const Container = styled.header`
    grid-area: header; // quando rolar a tela o header fica fixo

    height: 105px;
    width: 100%;

    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: ${({theme}) => theme.COLORS.BACKGROUND_700};

    display: flex;
    justify-content: space-between;
    padding: 0px 80px;
`;

export const Profile = styled(Link)`
    display: flex;
    align-items: center;

    // estilização de imagem dentro do componente profile
    > img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
    }

    > div {
        display: flex;
        flex-direction: column;
        margin-left: 16px;
        line-height: 24px; // afastamento de linhas
        // evitar fazer muitas hierarquias, até 3 níveis é o suficiente

        span {
            font-size: 14px;
            color: ${({theme}) => theme.COLORS.GRAY_100};
        }

        strong {
            font-size: 18px;
            color: ${({theme}) => theme.COLORS.WHITE};
        }
    }

`

export const Logout = styled.button`
    border: none;
    background: none;

    > svg {
        color: ${({theme}) => theme.COLORS.GRAY_100};
        font-size: 36px;
    }
`