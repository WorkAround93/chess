import { Console } from "console";
import { IAction } from "../../action/interfaces/iAction";
import { FigureType } from "../../figure/enums/figureType";
import State from "../state";

export const isValid = (state: string, action: string): boolean => {
    /**
     * Steps to check for legal move
     * 1. DeepCopy the state by parsing= nState (n)
     * 2. Advance the state by this move. (n+1)
     * 3. create a new State with  nStringState = qState (n+1)
     * 4. Parse nStringState
     *
     * first move queen 24
     */
    let flg = true;
    const thisState = getStateFromString(state);

    const nState = advanceStringState(state, action);

    nState.actions.forEach((nAction) => {
        if (nState.board[nAction.to].figure?.type === FigureType.KING) {
            flg = false;
        }
    });

    // if (flg) {
    //     console.log(`\n`);
    //     console.log("this STATE", thisState);
    //     console.log("next STATE", nState);
    // }
    return flg;
};

const getStateFromString = (state: string): State => {
    return new State(JSON.parse(state), false);
};

export const advanceStringState = (state: string, action: string): State => {
    const bState = getStateFromString(state);
    const bAction = JSON.parse(action);
    return new State(
        JSON.parse(bState.humanMove(bAction.figure.index, bAction.to)),
        false
    );
};
