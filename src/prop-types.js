import React from "react";

/**
 * const exampleGrid = {
 *     columnLabels: [[], [2]],
 *     rowLabels: [[1], [1]],
 *     rows: [
 *         [0, 0],
 *         [0, 0],
 *     ],
 * };
 */

const {
    number,
    arrayOf,
    shape,
} = React.PropTypes;

const label = arrayOf(number);
const labelList = arrayOf(label);

const row = arrayOf(number);
const grid = arrayOf(row);

const puzzle = shape({
    columnLabels: labelList,
    rowLabels: labelList,
    grid: grid,
});

export default { label, labelList, row, grid, puzzle };
