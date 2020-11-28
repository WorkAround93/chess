import { IFigure } from "../interfaces/iFigure";
import { IAction } from "../../action/interfaces/iAction";
import Action from "../../action/action";
import { FigureType } from "../enums/figureType";
import { inBound } from "../utils/inBound";
import State from "../../state/state";

class King implements IFigure {
    id: string;
    touched: boolean;
    type: FigureType;
    player: number;
    index: number;
    attacked: Set<number>;

    constructor(
        player: number,
        index: number,
        id: string,
        touched: boolean = false,
        attacked: Set<number> = new Set()
    ) {
        this.player = player;
        this.index = index;
        this.type = FigureType.KING;
        this.touched = touched;
        this.id = id;
        this.attacked = new Set();
        if (attacked.size > 0) {
            attacked.forEach((num: number) => {
                this.attacked.add(num);
            });
        }
    }

    getMoves(state: State): IAction[] {
        const { board } = state;
        const actions: Action[] = [];
        const direction = [-9, -8, -7, -1, 1, 7, 8, 9];
        direction.forEach((x) => {
            const newIndex = this.index + x;
            // Return if out of bounds
            if (!inBound(newIndex)) return;
            if (this.index % 8 === 7 && newIndex % 8 === 0) return;
            if (this.index % 8 === 0 && newIndex % 8 === 7) return;
            // increase occupied tiles
            board[newIndex].occupy(this.player);
            const tile = board[newIndex];
            if (
                (this.player === 1 && tile.occupiedByBlack) ||
                (this.player === -1 && tile.occupiedByWhite)
            ) {
                return;
            }
            // return  if the position can be captured
            const { figure } = tile;
            if (figure !== null) {
                if (figure.player !== this.player)
                    actions.push(new Action(this, newIndex, true));
                return;
            } else {
                actions.push(new Action(this, newIndex, true));
            }
        });
        //rochade

        return actions;
    }

    addToAttacked = (idx: number) => {
        this.attacked.add(idx);
    };
}

export default King;
