import React from "react";
import styled from "styled-components";

import Entry from "./Entry";

import { IAction } from "../../../../datastructure/action/interfaces/iAction";

interface Props {
    actions: IAction[];
}

const MoveDisplay: React.FC<Props> = ({ actions }) => {
    return (
        <Wrapper>
            <DisplayBox>
                {actions.map((action, idx) => {
                    return (
                        <Entry
                            key={`moveDisplayEntry-${idx}`}
                            idx={idx}
                            action={action}
                        />
                    );
                })}
            </DisplayBox>
        </Wrapper>
    );
};

const Wrapper = styled.div``;

const DisplayBox = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    overflow-y: scroll;
    height: 12vh;
`;

export default MoveDisplay;
