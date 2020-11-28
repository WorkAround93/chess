import { ITile } from "../../tile/interfaces/iTile";
import { IFigure } from "../../figure/interfaces/iFigure";
import { IAction } from "../../action/interfaces/iAction";
import King from "../../figure/figures/king";
import Tile from "../../tile/tile";

export interface IStateAttr {
    /**
     * @var board -> Represents the state of the board based on classes
     * @var whiteFigures -> Set of all white figures
     * @var blackFigures -> Set of all black figures
     * @var turn -> turn of the current gamestate
     * @var isTerminal -> boolean if the game is over
     * @var winner -> 1=white 2=black -1=none 0=draw
     * @var actions -> Set of  possible actions for this State
     */
    board: Tile[];
    whiteFigures: Array<IFigure>;
    blackFigures: Array<IFigure>;
    whiteKing: IFigure;
    blackKing: IFigure;
    turn: number;
    terminal: boolean;
    winner: number;
    whiteActions: Array<IAction>;
    blackActions: Array<IAction>;
    actionHistory: Array<IAction>;
}

export interface IState extends IStateAttr {
    advance(action: IAction): string;
    getMoves(onlyValid: boolean): void;
}
