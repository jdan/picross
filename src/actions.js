// Action types
export const SET_CELL_STATE = "SET_CELL_STATE";

// Constants
export const CellStates = {
    FILLED: "FILLED",
    EMPTY: "EMPTY",
    CHECKED: "CHECKED",
};

// Action creators
export function setCellState(row, column, cellState) {
    return {
        type: SET_CELL_STATE,
        row,
        column,
        cellState,
    };
}
