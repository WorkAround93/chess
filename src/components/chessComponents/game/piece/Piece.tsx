import React, { useEffect } from "react";
import { useDrag, DragPreviewImage } from "react-dnd";
import { FigureType } from "../../../../datastructure/figure/enums/figureType";
import { getImage } from "../../../../utils/getImage";

import PieceWrapper from "./PieceWrapper";
import ImgWrapper from "./ImgWrapper";

interface Props {
    player: number;
    index: number;
    type: FigureType;
}

const Piece: React.FC<Props> = ({ player, index, type }) => {
    const [{ isDragging }, dragRef, prevImg] = useDrag({
        item: { type: "piece", from: index },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const img = (
        <ImgWrapper
            src={player === 1 ? getImage.w[type] : getImage.b[type]}
            alt=""
        />
    );

    return (
        <>
            <DragPreviewImage connect={prevImg} src={""} />
            <PieceWrapper ref={dragRef} style={{ opacity: isDragging ? 0 : 1 }}>
                {img}
            </PieceWrapper>
        </>
    );
};

export default Piece;
