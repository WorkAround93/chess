import { IFigure } from "../../figure/interfaces/iFigure";
import Pawn from "../../figure/figures/pawn";
import Rook from "../../figure/figures/rook";
import Knight from "../../figure/figures/knight";
import Bishop from "../../figure/figures/bishop";
import King from "../../figure/figures/king";
import Queen from "../../figure/figures/queen";
import { FigureType } from "../../figure/enums/figureType";

export const createFigures = (
    id: string,
    player: number,
    index: number,
    type: number,
    touched: boolean | undefined,
    attacked: Set<number> | undefined,
    promoteTo: FigureType | undefined | null
): IFigure => {
    switch (type) {
        case 0:
            if ((index >= 0 && index < 8) || (index > 55 && index < 64)) {
                promoteTo = FigureType.QUEEN;
                return createFigures(
                    id,
                    player,
                    index,
                    promoteTo,
                    touched,
                    attacked,
                    undefined
                );
            }
            return new Pawn(player, index, id, touched);
        case 1:
            return new Rook(player, index, id, touched);
        case 2:
            return new Knight(player, index, id);
        case 3:
            return new Bishop(player, index, id);
        case 4:
            return new Queen(player, index, id);
        default:
            return new King(player, index, id, touched, attacked);
    }
};
