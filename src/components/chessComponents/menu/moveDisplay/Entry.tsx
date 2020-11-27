import React from "react";
import styled from "styled-components";

import { IAction } from "../../../../datastructure/action/interfaces/iAction";

interface Props {
    idx: number;
    action?: IAction;
    text?: string;
}

const Entry: React.FC<Props> = ({ idx, action, text }) => {
    if (text) {
        return (
            <EntryWrapper>
                <h2>{text}</h2>
            </EntryWrapper>
        );
    } else {
        return (
            <>
                {idx % 2 === 0 && <EntryWrapper>{(idx + 2) / 2}</EntryWrapper>}
                {idx % 2 === 0 && <EntryWrapper>A{idx}</EntryWrapper>}
                {idx % 2 === 1 && <EntryWrapper>B{idx}</EntryWrapper>}
            </>
        );
    }
};

const EntryWrapper = styled.div`
    justify-content: center;
    width: 33%;
    order: ${(props) => props.defaultValue};
`;

export default Entry;
