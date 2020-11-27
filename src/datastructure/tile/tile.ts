import { IFigure } from '../figure/interfaces/iFigure';
import { ITile } from './interfaces/iTile';

class Tile implements ITile {
  figure: IFigure | null;
  index: number;
  color: boolean;
  occupiedByBlack: boolean;
  occupiedByWhite: boolean;

  constructor(color: boolean, index: number) {
    this.color = color;
    this.index = index;
    this.occupiedByBlack = false;
    this.occupiedByWhite = false;
    this.figure = null;
  }

  hasFigure(): boolean {
    return this.figure !== null;
  }

  unset(): void {
    this.occupiedByWhite = false;
    this.occupiedByBlack = false;
  }

  occupy(player: number): void {
    player === 1
      ? (this.occupiedByWhite = true)
      : (this.occupiedByBlack = true);
  }

  toStr(): string {
    return this.figure !== null ? `${this.figure.type}` : ' ';
  }
}

export default Tile;
