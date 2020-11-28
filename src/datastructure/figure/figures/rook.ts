import { IFigure } from "../interfaces/iFigure";
import { IAction } from "../../action/interfaces/iAction";
import Action from "../../action/action";
import { ITile } from "../../tile/interfaces/iTile";
import { FigureType } from "../enums/figureType";
import { inBound } from "../utils/inBound";
import State from "../../state/state";

class Rook implements IFigure {
    id: string;
    touched: boolean;
    player: number;
    index: number;
    type: FigureType;

    constructor(
        player: number,
        index: number,
        id: string,
        touched: boolean = false
    ) {
        this.player = player;
        this.index = index;
        this.touched = touched;
        this.type = FigureType.ROOK;
        this.id = id;
    }

    getMoves(state: State): IAction[] {
        const { board } = state;
        const actions: Action[] = [];
        const direction = [+8, -8, +1, -1]; // position that a bishop can move to
        direction.forEach((x) => {
            let newIndex = this.index + x;
            while (inBound(newIndex)) {
                // return if the board is overextended on any site
                if (x === -1 && newIndex % 8 === 7) return;
                else if (x === 1 && newIndex % 8 === 0) return;
                //Check opponent abort the iteration finding any figure
                board[newIndex].occupy(this.player);
                const { figure } = board[newIndex];
                if (figure !== null) {
                    if (figure.player !== this.player) {
                        actions.push(new Action(this, newIndex, true));
                        if (figure.type === FigureType.KING) {
                            figure.attacked?.add(this.index);
                        }
                    }
                    return;
                } else {
                    actions.push(new Action(this, newIndex, true));
                }
                newIndex += x;
            }
        });
        return actions;
    }
}

export default Rook;
