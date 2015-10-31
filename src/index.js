import React from "react";
import { render } from "react-dom";
import { Picross } from "./Picross";

const examplePuzzle = {
    columnLabels: [[], [2]],
    rowLabels: [[1], [1]],
    grid: [
        [0, 0],
        [0, 0],
    ],
};

render(<Picross puzzle={examplePuzzle} />, document.getElementById("root"));
