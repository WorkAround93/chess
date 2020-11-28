import Action from "../../action/action";
import { IAction } from "../../action/interfaces/iAction";

import King from "../../figure/figures/king";
import State from "../state";

export const isValid = (state: string, actions: Action[]): Action[] => {
    /**
     * Steps to check for legal move
     * 1. DeepCopy the state by parsing= nState (n)
     * 2. Advance the state by this move. (n+1)
     * 3. create a new State with  nStringState = qState (n+1)
     * 4. Parse nStringState
     *
     * first move queen 24
     */
    let nState = new State(JSON.parse(state), false);
    const color: boolean = nState.turn % 2 === 1;
    let nKing = color ? (nState.blackKing as King) : (nState.whiteKing as King);
    // If the King is being attacked by multiple sources he must move.
    if (nKing.attacked.size > 1) {
        const vActions = actions.filter(
            (action) =>
                action.figure.index === nKing.index &&
                !(nState.turn % 2 === 0
                    ? nState.board[action.to].occupiedByBlack
                    : nState.board[action.to].occupiedByWhite)
        );
        return vActions;
    } else {
        const vActions: Array<IAction> = [];
        actions.forEach((action) => {
            const stringAction = JSON.stringify(action); // kill dependencies
            nState = advanceStringState(state, stringAction);
            const advancedKing = !color
                ? (nState.blackKing as King)
                : (nState.whiteKing as King);
            if (advancedKing.attacked.size === 0) {
                vActions.push(action);
            }
        });
        return vActions;
    }
};

export const advanceStringState = (state: string, action: string): State => {
    const bState = getStateFromString(state);
    const bAction = JSON.parse(action);
    return new State(
        JSON.parse(bState.humanMove(bAction.figure.index, bAction.to)),
        false
    );
};

const getStateFromString = (state: string): State => {
    return new State(JSON.parse(state), false);
};
