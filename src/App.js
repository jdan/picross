import React, { PropTypes, Component } from "react";
import { connect } from "react-redux";

import { RowLabels, ColumnLabels } from "./Labels";
import Grid from "./Grid";
import { styleConstants, fontStyles } from "./style-constants";


class App extends Component {
    render() {
        // Injected by `connect`
        const { dispatch, grid, columnLabels, rowLabels } = this.props;

        const styles = {
            row: {
                display: "flex",
            },

            spacer: {
                width: styleConstants.labelContainerSize,
                height: styleConstants.labelContainerSize,
            },
        }

        return <div>
            <div style={styles.row}>
                <div style={styles.spacer} />
                <ColumnLabels labels={columnLabels} />
            </div>

            <div style={styles.row}>
                <RowLabels labels={rowLabels} />
                <Grid grid={grid} />
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
