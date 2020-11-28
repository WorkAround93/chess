import { IAction } from "../action/interfaces/iAction";
import { IFigure } from "../figure/interfaces/iFigure";
import { ITile } from "../tile/interfaces/iTile";
import Tile from "../tile/tile";
import { IState, IStateAttr } from "./interfaces/iState";
import { createFigures } from "./savedStates/createFigures";
import { isValid } from "./moveValidation/isValid";
import Action from "../action/action";
import King from "../figure/figures/king";
import { FigureType } from "../figure/enums/figureType";

class State implements IState {
    board: ITile[];
    whiteFigures: Array<IFigure>;
    blackFigures: Array<IFigure>;
    whiteKing: IFigure;
    blackKing: IFigure;
    turn: number;
    terminal: boolean;
    winner: number;
    whiteActions: Array<IAction>;
    blackActions: Array<IAction>;
    actionHistory: IAction[];

    constructor(objectState: IStateAttr, onlyValid: boolean = true) {
        this.board = [];
        this.whiteFigures = [];
        this.blackFigures = [];
        this.turn = objectState.turn;
        this.terminal = objectState.terminal;
        this.winner = objectState.winner;
        this.blackActions = [];
        this.whiteActions = [];
        this.actionHistory = [];
        this.whiteKing = new King(1, 0, "k");
        this.blackKing = new King(1, 0, "k");
        this.createEmptyBoard(objectState);
        this.getMoves(onlyValid);
    }

    humanMove(iFrom: number, iTo: number): string {
        const actions =
            this.turn % 2 === 1 ? this.whiteActions : this.blackActions;
        actions.forEach((action) => {
            const { figure, to } = action;
            const { index } = figure;
            if (index === iFrom && iTo === to) {
                return this.advance(action);
            }
        });
        return JSON.stringify(this);
    }

    advance(action: IAction): string {
        if (this.terminal) return JSON.stringify(this);
        const { figure, to, flag, specialFigure, specialTo } = action;
        const tile = this.board[to];
        if (tile.figure !== null) {
            this.deleteFromFigures(tile.figure.player, tile.figure);
        }
        if (specialFigure !== null) {
            if (specialTo === null) {
                this.deleteFromFigures(specialFigure.player, specialFigure);
            } else {
                specialFigure.index = specialTo;
            }
        }
        figure.index = to;
        figure.touched = flag;
        this.turn++;
        this.actionHistory.push(action);
        return JSON.stringify(this);
    }

    deleteFromFigures(player: number, figure: IFigure) {
        if (player === 1) {
            this.whiteFigures = this.whiteFigures.filter(
                (obj) => obj !== figure
            );
        } else {
            this.blackFigures = this.blackFigures.filter(
                (obj) => obj !== figure
            );
        }
    }

    createEmptyBoard(objectState: IStateAttr): void {
        let counter = 0;
        for (let i = 0; i < 64; i++) {
            if (i % 8 === 0) counter += 1;
            this.board.push(new Tile((counter + i) % 2 === 0, i));
        }
        objectState.blackFigures.forEach((element: IFigure) => {
            const { id, index, type, player, touched, attacked } = element;
            const fig: IFigure = createFigures(
                id,
                player,
                index,
                type,
                touched,
                attacked
            );
            this.board[fig.index].figure = fig;
            this.blackFigures.push(fig);

            if (fig.type === FigureType.KING) {
                this.blackKing = fig;
            }
        });
        objectState.whiteFigures.forEach((element: IFigure) => {
            const { id, index, type, player, touched, attacked } = element;
            const fig: IFigure = createFigures(
                id,
                player,
                index,
                type,
                touched,
                attacked
            );
            this.board[fig.index].figure = fig;
            this.whiteFigures.push(fig);
            if (fig.type === FigureType.KING) {
                this.whiteKing = fig;
            }
        });
        objectState.actionHistory.forEach((element: IAction) => {
            const { figure, to, flag, specialFigure, specialTo } = element;
            this.actionHistory.push(
                new Action(figure, to, flag, specialFigure, specialTo)
            );
        });
    }

    setTerminal() {
        this.terminal = true;
        this.winner = this.turn % 2 === 0 ? 1 : -1;
    }

    getFiguresMoves(figures: Array<IFigure>): Array<IAction> {
        const retVal: Array<IAction> = [];
        figures.forEach((fig: IFigure) => {
            const figMoves = fig.getMoves(this);
            figMoves.forEach((action) => {
                retVal.push(action);
            });
        });
        return retVal;
    }
    // King is recognized here
    getMoves(onlyValid: boolean) {
        this.whiteKing.attacked?.clear();
        this.blackKing.attacked?.clear();
        this.whiteActions = this.getFiguresMoves(this.whiteFigures);
        this.blackActions = this.getFiguresMoves(this.blackFigures);
        this.whiteActions = this.getFiguresMoves(this.whiteFigures);
        if (onlyValid) {
            const turnBasedAction: Array<IAction> =
                this.turn % 2 === 1 ? this.whiteActions : this.blackActions;
            const validActions = isValid(JSON.stringify(this), turnBasedAction);
            if (validActions.length === 0) {
                this.setTerminal();
            } else if (this.turn % 2 === 1) {
                this.whiteActions = validActions;
            } else {
                this.blackActions = validActions;
            }
        }
    }
}

export default State;
