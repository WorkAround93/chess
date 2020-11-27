import React from "react";
import styled from "styled-components";

interface Props {
    title: string;
}

const Caption: React.FC = () => {
    const caption = "Easy Chess";

    return <CaptionWrapper>{caption}</CaptionWrapper>;
};

export default Caption;

const CaptionWrapper = styled.h1`
    position: relative;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 20vh;
    background-color: yellow;
    font: ${(props) => props.theme.font};
`;
