import { IFigure } from "../../figure/interfaces/iFigure";

export interface IAction {
    /**
     * @var figure -> figure
     * @var to -> index to move to [0-63]
     * @var flag -> set a flag for this @var figure
     * @var specialFigure -> Special figure ptr for (en passant and )
     * @var specialTo -> Special index to
     */
    figure: IFigure;
    to: number;
    flag: boolean;
    specialFigure: IFigure | null;
    specialTo: number | null;
    from: number | null;
}
