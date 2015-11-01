import React from "react";
import { render } from "react-dom";
import { App } from "./App";

const examplePuzzle = {
    columnLabels: [[], [2]],
    rowLabels: [[1], [1]],
    grid: [
        [2, 1],
        [0, 0],
    ],
};

render(<App puzzle={examplePuzzle} />, document.getElementById("root"));
