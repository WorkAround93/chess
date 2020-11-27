import { IFigure } from '../figure/interfaces/iFigure';
import { IAction } from '../action/interfaces/iAction';

class Action implements IAction {
  figure: IFigure;
  to: number;
  flag: boolean;
  specialFigure: IFigure | null;
  specialTo: number | null;

  constructor(
    figure: IFigure,
    to: number,
    flag: boolean = false,
    specialFigure: IFigure | null = null,
    specialTo: number | null = null
  ) {
    this.figure = figure;
    this.to = to;
    this.flag = flag;
    this.specialFigure = specialFigure;
    this.specialTo = specialTo;
  }
}
export default Action;
