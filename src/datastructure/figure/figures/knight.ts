import { IFigure } from "../interfaces/iFigure";
import { IAction } from "../../action/interfaces/iAction";
import Action from "../../action/action";
import { ITile } from "../../tile/interfaces/iTile";
import { FigureType } from "../enums/figureType";
import { inBound } from "../utils/inBound";

class Knight implements IFigure {
    id: string;
    player: number;
    index: number;
    type: FigureType;

    constructor(player: number, index: number, id: string) {
        this.player = player;
        this.index = index;
        this.type = FigureType.KNIGHT;
        this.id = id;
    }

    getMoves(board: ITile[]): IAction[] {
        const actions: Action[] = [];
        [+16, -16, +2, -2].forEach((x) => {
            if (x === 16 || x === -16) {
                [+1, -1].forEach((y) => {
                    const nIdx = this.index + x + y;
                    if (inBound(nIdx)) {
                        if (y === 1 && nIdx % 8 < this.index % 8) return;
                        if (y === -1 && nIdx % 8 > this.index % 8) return;
                        board[nIdx].occupy(this.player);
                        const tile = board[nIdx];
                        if (tile.figure !== null) {
                            if (tile.figure.player !== this.player) {
                                actions.push(new Action(this, nIdx));
                            }
                        } else {
                            actions.push(new Action(this, nIdx));
                        }
                    }
                });
            } else {
                [+8, -8].forEach((y) => {
                    const nIdx = this.index + x + y;
                    if (inBound(nIdx)) {
                        if (y === 8 && nIdx % 8 < this.index % 8) return;
                        if (y === -8 && nIdx % 8 > this.index % 8) return;
                        board[nIdx].occupy(this.player);
                        const tile = board[nIdx];
                        if (tile.figure !== null) {
                            if (tile.figure.player !== this.player) {
                                actions.push(new Action(this, nIdx));
                            }
                        } else {
                            actions.push(new Action(this, nIdx));
                        }
                    }
                });
            }
        });
        return actions;
    }
}

export default Knight;
