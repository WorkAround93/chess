import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import TileWrapper from "./TileWrapper";

import { IFigure } from "../../../../datastructure/figure/interfaces/iFigure";

import PieceComponent from "../piece/Piece";

import { reducerType } from "../../../../reducer/StateReducer";

interface Props {
    index: number;
    color: boolean;
    figure: IFigure | null;
    dispatch: any;
}

const Tile: React.FC<Props> = ({ index, color, figure, dispatch }) => {
    const [, dropRef] = useDrop({
        accept: "piece",
        drop: (props, item) => {
            const { from } = item.getItem();
            dispatch({
                type: reducerType.advance,
                payload: { from: from, to: index },
            });
        },
    });

    return (
        <TileWrapper color={color ? "light" : "dark"} ref={dropRef}>
            {figure && (
                <PieceComponent
                    type={figure?.type}
                    player={figure.player}
                    index={figure.index}
                />
            )}
        </TileWrapper>
    );
};

export default Tile;
