import React, { PropTypes, Component } from "react";

import { RowLabels, ColumnLabels } from "./Labels";
import Grid from "./Grid";
import { styleConstants, fontStyles } from "./style-constants";


export class App extends Component {
    render() {
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
                <ColumnLabels labels={this.props.puzzle.columnLabels} />
            </div>

            <div style={styles.row}>
                <RowLabels labels={this.props.puzzle.rowLabels} />
                <Grid grid={this.props.puzzle.grid} />
            </div>
        </div>;
    }
}
App.propTypes = {
    puzzle: PropTypes.shape({
        columnLabels: ColumnLabels.propTypes.labels.isRequired,
        rowLabels: RowLabels.propTypes.labels.isRequired,
        grid: Grid.propTypes.grid.isRequired,
    }).isRequired,
};
