import React, { PropTypes, Component } from "react";
import { connect } from "react-redux";

import { RowLabels, ColumnLabels } from "./Labels";
import Grid from "./Grid";
import { styleConstants, fontStyles } from "./style-constants";
import { setCellState } from "./actions";


class App extends Component {
    render() {
        // Injected by `connect`
        const { dispatch, grid, columnLabels, rowLabels } = this.props;

        const styles = {
            row: {
                display: "flex",
            },

            topRow: {
                justifyContent: "flex-end",
            },
        }

        const onCellChange = (row, column, state) => {
            dispatch(setCellState(row, column, state));
        };

        return <div style={{margin: "auto"}}>
            <div style={{...styles.row, ...styles.topRow}}>
                <ColumnLabels labels={columnLabels} />
            </div>

            <div style={styles.row}>
                <RowLabels labels={rowLabels} />
                <Grid grid={grid} onCellChange={onCellChange} />
            </div>
        </div>;
    }
}
App.propTypes = {
    columnLabels: ColumnLabels.propTypes.labels,
    rowLabels: RowLabels.propTypes.labels,
    grid: Grid.propTypes.grid,
};

// Connect the App component with the identity selector
export default connect(x => x)(App);
