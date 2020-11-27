import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import State from "../../../datastructure/state/state";
import HeroMenu from "../menu/HeroMenu";
import Board from "./board/Board";

interface Props {
    state: State;
    dispatch: any;
}

/**
 *
 * @param param0 Used  to  display all components for the actual  gameand any necessary information
 */

const InformationProvider: React.FC<Props> = ({ state, dispatch }) => {
    return (
        <Wrapper>
            <DndProvider backend={HTML5Backend}>
                <Board state={state} dispatch={dispatch} />
            </DndProvider>
            <HeroMenu state={state} dispatch={dispatch} />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default InformationProvider;
