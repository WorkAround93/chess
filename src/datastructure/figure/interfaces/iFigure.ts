import { IAction } from "../../action/interfaces/iAction";
import { FigureType } from "../enums/figureType";
import { ITile } from "../../tile/interfaces/iTile";
import State from "../../state/state";

export interface IFigureAttr {
    id: string;
    player: number;
    index: number;
    type: FigureType;
    touched?: boolean;
    attacked?: Set<number>;
}

export interface IFigure extends IFigureAttr {
    getMoves(state: State): IAction[];
}
