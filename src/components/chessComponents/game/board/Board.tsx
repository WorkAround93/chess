import React from "react";

import BoardWrapper from "./BoardWrapper";

import State from "../../../../datastructure/state/state";
import Tile from "../tile/Tile";

interface Props {
    state: State;
    dispatch: any;
}

const Board: React.FC<Props> = ({ state, dispatch }) => {
    return (
        <BoardWrapper>
            {state.board.map((tile, idx) => {
                const { index, color, figure } = tile;
                return (
                    <Tile
                        key={`tile${idx}`}
                        index={index}
                        color={color}
                        figure={figure}
                        dispatch={dispatch}
                    />
                );
            })}
        </BoardWrapper>
    );
};

export default Board;
