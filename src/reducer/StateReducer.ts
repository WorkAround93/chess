import { savedState } from "../datastructure/state/savedStates/savedState";
import State from "../datastructure/state/state";

export const stateReducer = (state: State, action: ReducerAction) => {
    switch (action.type) {
        case reducerType.advance:
            const saved = state.humanMove(
                action.payload.from,
                action.payload.to
            );
            state = new State(JSON.parse(saved), true);
            return state;
        case reducerType.reset:
            return new State(savedState, true);
    }
};

interface ReducerAction {
    type: reducerType;
    payload: Move;
}

export enum reducerType {
    "advance",
    "reset",
}

interface Move {
    from: number;
    to: number;
}
