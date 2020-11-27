import { IFigure } from '../interfaces/iFigure';
import { IAction } from '../../action/interfaces/iAction';
import Action from '../../action/action';
import { ITile } from '../../tile/interfaces/iTile';
import { FigureType } from '../enums/figureType';
import { inBound } from '../utils/inBound';

class Pawn implements IFigure {
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
    this.id = id;
    this.index = index;
    this.player = player;
    this.type = FigureType.PAWN;
    this.touched = touched;
  }

  getMoves(board: ITile[]): IAction[] {
    const actions: Action[] = [];
    const direction = 8 * -this.player; // direction
    let newIndex = direction + this.index;
    if (inBound(newIndex)) {
      if (this.canMove(board, newIndex)) {
        actions.push(new Action(this, newIndex, true));
        newIndex += direction;
        if (!this.touched && this.canMove(board, newIndex))
          actions.push(new Action(this, newIndex, true));
      }
      newIndex = direction + this.index;
      const left = newIndex - 1;
      if (this.canCapture(board, true, left)) {
        board[left].occupy(this.player);
        actions.push(new Action(this, left, true));
      }
      const right = newIndex + 1;
      if (this.canCapture(board, false, right)) {
        board[right].occupy(this.player);
        actions.push(new Action(this, right, true));
      }
    }
    return actions;
  }

  canMove(board: ITile[], index: number): boolean {
    if (inBound(index)) {
      const { figure } = board[index];
      return figure === null;
    }
    return false;
  }

  canCapture(board: ITile[], side: boolean, index: number): boolean {
    if (inBound(index) && (side ? index % 8 !== 7 : index % 8 !== 0)) {
      const { figure } = board[index];
      if (figure !== null) {
        return figure.player !== this.player;
      }
    }
    return false;
  }
}

export default Pawn;