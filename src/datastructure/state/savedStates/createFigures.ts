import { IFigure } from "../../figure/interfaces/iFigure";
import Pawn from "../../figure/figures/pawn";
import Rook from "../../figure/figures/rook";
import Knight from "../../figure/figures/knight";
import Bishop from "../../figure/figures/bishop";
import King from "../../figure/figures/king";
import Queen from "../../figure/figures/queen";

export const createFigures = (
    id: string,
    player: number,
    index: number,
    type: number,
    touched: boolean | undefined,
    attacked: IFigure[] | undefined
): IFigure => {
    switch (type) {
        case 0:
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
