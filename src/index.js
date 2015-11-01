import React from "react";
import { render } from "react-dom";
import { compose, createStore } from "redux";
import { Provider } from "react-redux";
import { devTools } from "redux-devtools";
import { DevTools, DebugPanel, LogMonitor } from "redux-devtools/lib/react";

import App from "./App";
import picrossApp from "./reducers";
import { CellStates } from "./actions";

const { EMPTY } = CellStates;

const finalCreateStore = compose(devTools())(createStore);

function createEmptyGrid(rows, columns) {
    const grid = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
            row.push(EMPTY);
        }
        grid.push(row);
    }

    return grid;
}

const store = finalCreateStore(picrossApp, {
    columnLabels: [[4], [], [1, 1, 1], [], [4]],
    rowLabels: [[1], [1, 1], [1, 1, 1], [1, 1], [1, 1, 1]],
    grid: createEmptyGrid(5, 5),
});

const root = document.getElementById("root");

render(
    <div style={{display: "flex", height: "100vh"}}>
        <Provider store={store}>
            <App />
        </Provider>
        <DebugPanel top right bottom>
            <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
    </div>,
    root
);
