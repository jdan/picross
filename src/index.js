import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "./App";
import picrossApp from "./reducers";
import { CellStates } from "./actions";

const { EMPTY } = CellStates;

const store = createStore(picrossApp, {
    columnLabels: [[], [2]],
    rowLabels: [[1], [1]],
    grid: [
        [EMPTY, EMPTY,],
        [EMPTY, EMPTY,],
    ],
});

const root = document.getElementById("root");

render(
    <Provider store={store}>
        <App />
    </Provider>,
    root
);
