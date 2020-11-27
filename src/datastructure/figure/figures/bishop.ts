import { IFigure } from '../interfaces/iFigure';
import { IAction } from '../../action/interfaces/iAction';
import Action from '../../action/action';
import { ITile } from '../../tile/interfaces/iTile';
import { FigureType } from '../enums/figureType';
import { inBound } from '../utils/inBound';

class Bishop implements IFigure {
  id: string;
  player: number;
  index: number;
  type: FigureType;

  constructor(player: number, index: number, id: string) {
    this.player = player;
    this.index = index;
    this.type = FigureType.BISHOP;
    this.id = id;
  }

  getMoves(board: ITile[]): IAction[] {
    const actions: Action[] = [];
    const direction = [+9, -9, +7, -7]; // position that a bishop can move to
    direction.forEach((x) => {
      let newIndex = this.index + x;
      while (inBound(newIndex)) {
        // return if the board is overextended on any site
        if ((x === -7 || x === 9) && newIndex % 8 === 0) return;
        else if ((x === 7 || x === -9) && newIndex % 8 === 7) return;
        board[newIndex].occupy(this.player);
        const { figure } = board[newIndex];
        if (figure !== null) {
          if (figure.player !== this.player)
            actions.push(new Action(this, newIndex));
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

export default Bishop;
