import React from "react";
import styled from "styled-components";

interface Props {
    text: string;
    givenFunc: any;
}

const MenuButton: React.FC<Props> = ({ text, givenFunc }) => {
    return <ButtonWrapper onClick={() => givenFunc()}>{text}</ButtonWrapper>;
};

const ButtonWrapper = styled.button`
    background-color: green;
`;
