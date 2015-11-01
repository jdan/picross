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

const store = finalCreateStore(picrossApp, {
    columnLabels: [[], [2]],
    rowLabels: [[1], [1]],
    grid: [
        [EMPTY, EMPTY,],
        [EMPTY, EMPTY,],
    ],
});

const root = document.getElementById("root");

render(
    <div>
        <Provider store={store}>
            <App />
        </Provider>
        <DebugPanel top right bottom>
            <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
    </div>,
    root
);
