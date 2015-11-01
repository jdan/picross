import { combineReducers } from "redux";
import { SET_CELL_STATE, CellStates } from "./actions";

const { FILLED, EMPTY, CHECKED } = CellStates;

function grid(state = [], action) {
    switch(action.type) {
        case SET_CELL_STATE:
            // Change [i][j] of the state to `action.cellState`
            return [
                ...state.slice(0, action.row),
                ...[
                    ...state[action.row].slice(0, action.column),
                    action.cellState,
                    ...state[action.row].slice(action.column + 1),
                ],
                ...state.slice(action.row + 1),
            ];
        default:
            return state;
    }
}

const noop = (state = []) => state;
const picrossApp = combineReducers({
    // noop for now
    columnLabels: noop,
    rowLabels: noop,

    // grid has a reducer though
    grid,
});

export default picrossApp;
