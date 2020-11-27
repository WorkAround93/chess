import React from "react";
import styled from "styled-components";
import MoveDisplay from "./moveDisplay/MoveDisplay";
import Entry from "./moveDisplay/Entry";
import State from "../../../datastructure/state/state";

interface Props {
    state: State;
    dispatch: any;
}

const HeroMenu: React.FC<Props> = ({ state, dispatch }) => {
    return (
        <Wrapper>
            <ItemEntry>
                <Entry text="Turn" idx={-1} />
                <Entry text="White" idx={-1} />
                <Entry text="Black" idx={-1} />
            </ItemEntry>
            <MoveDisplay actions={state.actionHistory} />
            <ItemEntry>
                <button>Reset</button>
                <button>Reset</button>
                <button>Reset</button>
            </ItemEntry>
        </Wrapper>
    );
};

export default HeroMenu;

const ItemEntry = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`;

const Wrapper = styled.div`
    order: 2;
    background-color: white;
    flex-basis: 25%;
    height: 10vh;
    board: 80px, solid, black;
`;
