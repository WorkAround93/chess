import { IFigure } from "../interfaces/iFigure";
import { IAction } from "../../action/interfaces/iAction";
import Action from "../../action/action";
import { ITile } from "../../tile/interfaces/iTile";
import { FigureType } from "../enums/figureType";
import { inBound } from "../utils/inBound";

class King implements IFigure {
    id: string;
    touched: boolean;
    type: FigureType;
    player: number;
    index: number;
    attacked: IFigure[];

    constructor(
        player: number,
        index: number,
        id: string,
        touched: boolean = false,
        attacked: IFigure[] = []
    ) {
        this.player = player;
        this.index = index;
        this.type = FigureType.KING;
        this.touched = touched;
        this.id = id;
        this.attacked = attacked;
    }

    getMoves(board: ITile[]): IAction[] {
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
            const occupied =
                this.player === 1 ? tile.occupiedByBlack : tile.occupiedByWhite;
            // return  if the position can be captured
            if (occupied) return;
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
}

export default King;
