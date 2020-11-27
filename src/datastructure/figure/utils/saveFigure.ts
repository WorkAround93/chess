import { IFigure, IFigureAttr } from '../interfaces/iFigure';

export const saveFigure = (fig: IFigure): IFigureAttr => {
  const retVal: IFigureAttr = {
    id: fig.id,
    index: fig.index,
    player: fig.player,
    type: fig.type,
    touched: fig.touched
  };
  return retVal;
};
