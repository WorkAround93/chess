import { IAction } from "../action/interfaces/iAction";
import { IFigure } from "../figure/interfaces/iFigure";
import { ITile } from "../tile/interfaces/iTile";
import Tile from "../tile/tile";
import { IState, IStateAttr } from "./interfaces/iState";
import { createFigures } from "./savedStates/createFigures";
import { isValid } from "./moveValidation/isValid";
import Action from "../action/action";

class State implements IState {
    board: ITile[];
    whiteFigures: Array<IFigure>;
    blackFigures: Array<IFigure>;
    turn: number;
    terminal: boolean;
    winner: number;
    actions: Array<IAction>;
    actionHistory: IAction[];

    constructor(
        objectState: IStateAttr,
        onlyValid: boolean = true,
        callReducer: boolean = false
    ) {
        if (callReducer) console.log(objectState);
        this.board = [];
        this.whiteFigures = [];
        this.blackFigures = [];
        this.turn = objectState.turn;
        this.terminal = objectState.terminal;
        this.winner = objectState.winner;
        this.actions = [];
        this.actionHistory = [];
        this.createEmptyBoard(objectState);
        this.getMoves(onlyValid);
    }

    humanMove(iFrom: number, iTo: number): string {
        this.actions.forEach((action) => {
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

    getMoves(onlyValid: boolean) {
        const figures =
            this.turn % 2 === 0 ? this.blackFigures : this.whiteFigures;
        const actions: Array<IAction> = [];
        figures.forEach((fig) => {
            const m = fig.getMoves(this.board);
            m.forEach((action) => {
                actions.push(action);
            });
        });
        if (onlyValid) {
            actions.forEach((action) => {
                const stringState = JSON.stringify(this);
                if (isValid(stringState, JSON.stringify(action)))
                    this.actions.push(action);
                if (this.actions.length === 0) this.setTerminal();
            });
        } else {
            this.actions = actions;
        }
    }
}

export default State;
