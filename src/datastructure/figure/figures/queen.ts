import { IFigure } from "../interfaces/iFigure";
import { IAction } from "../../action/interfaces/iAction";
import Action from "../../action/action";
import { ITile } from "../../tile/interfaces/iTile";
import { FigureType } from "../enums/figureType";
import { inBound } from "../utils/inBound";
import State from "../../state/state";
import King from "./king";

class Queen implements IFigure {
    id: string;
    index: number;
    player: number;
    type: FigureType;

    constructor(player: number, index: number, id: string) {
        this.id = id;
        this.index = index;
        this.player = player;
        this.type = FigureType.QUEEN;
    }

    getMoves(state: State): IAction[] {
        const { board } = state;
        const actions: IAction[] = [];
        const direction = [9, 8, 7, 1, -1, -7, -8, -9];
        direction.forEach((x) => {
            let newIndex = this.index + x;
            while (inBound(newIndex)) {
                if ((x === 9 || x === 1 || x === -7) && newIndex % 8 === 0)
                    return;
                if ((x === -9 || x === -1 || x === 7) && newIndex % 8 === 7)
                    return;
                board[newIndex].occupy(this.player);
                const { figure } = board[newIndex];
                if (figure !== null) {
                    if (figure.player !== this.player) {
                        actions.push(new Action(this, newIndex));
                        if (figure.type === FigureType.KING) {
                            if (this.player === 1) {
                                state.blackKing.attacked?.add(this.index);
                            } else {
                                state.whiteKing.attacked?.add(this.index);
                            }
                        }
                    }
                    return;
                } else {
                    actions.push(new Action(this, newIndex));
                }
                newIndex += x;
            }
        });
        return actions;
    }
}

export default Queen;
