import { IAction } from "../../action/interfaces/iAction";
import { FigureType } from "../enums/figureType";
import { ITile } from "../../tile/interfaces/iTile";

export interface IFigureAttr {
    id: string;
    player: number;
    index: number;
    type: FigureType;
    touched?: boolean;
    attacked?: IFigure[];
}

export interface IFigure extends IFigureAttr {
    getMoves(board: ITile[]): IAction[];
}
