import { IFigure } from "../../figure/interfaces/iFigure";

export interface ITileAttr {
    /**
     * @var figure -> figure which is apllied to this tile
     * @var index -> index in board
     * @var color -> color of the field
     * @var occupiedByBlack -> black can move on this field
     * @var occupiedByWhite -> white can move on this field
     * @function hasFigure -> boolean if figure is on tile
     * @function occupy(number) -> -1=black 1=white
     * @function unset() -> removes any occupation
     */
    figure: IFigure | null;
    index: number;
    color: boolean;
    occupiedByBlack: boolean;
    occupiedByWhite: boolean;
}

export interface ITile extends ITileAttr {
    hasFigure(): boolean;
    occupy(player: number): void;
    unset(): void;
    toStr(): string;
}

export default ITile;
