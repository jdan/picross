import React, { PropTypes, Component } from "react";

const styleConstants = {
    cellWidth: 15,
    cellHeight: 15,
    labelContainerSize: 60,
    black: "#000000",
};

class LabelCell extends Component {
    render() {
        const style = {
            boxSizing: "border-box",
            textAlign: "center",
            width: styleConstants.cellWidth,
            height: styleConstants.cellHeight,
            color: styleConstants.black,
            fontSize: 12,
            fontFamily: "monospace",
        };

        return <div style={style}>
            {this.props.value}
        </div>;
    }
}
LabelCell.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.number,
        // Empty string
        PropTypes.string,
    ]).isRequired,
};

class Label extends Component {
    render() {
        const contents = (this.props.label.length === 0) ?
            <LabelCell value={" "} /> :

            this.props.label.map((cell, i) => {
                return <LabelCell value={cell} key={i} />;
            });

        return <div style={this.props.style}>
            {contents}
        </div>
    }
};
Label.propTypes = {
    label: PropTypes.arrayOf(LabelCell.propTypes.value).isRequired,
    style: PropTypes.object,
};


// A list of row labels from top to bottom
class RowLabels extends Component {
    render() {
        const styles = {
            container: {
                width: styleConstants.labelContainerSize,
            },

            label: {
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
            },
        };

        const labels = this.props.labels.map((label, i) => {
            return <Label label={label} style={styles.label} key={i} />;
        });

        return <div style={styles.container}>
            {labels}
        </div>;
    }
}
RowLabels.propTypes = {
    labels: PropTypes.arrayOf(Label.propTypes.label).isRequired,
};

// A list of row labels from top to bottom
class ColumnLabels extends Component {
    render() {
        const styles = {
            container: {
                height: styleConstants.labelContainerSize,
                display: "flex",
                justifyContent: "flex-start",
            },

            label: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
            },
        };

        const labels = this.props.labels.map((label, i) => {
            return <Label label={label} key={i} style={styles.label} />;
        });

        return <div style={styles.container}>
            {labels}
        </div>;
    }
}
ColumnLabels.propTypes = {
    labels: PropTypes.arrayOf(Label.propTypes.label).isRequired,
};


class Row extends Component {
    render() {
        const styles = {
            row: {
                display: "flex",
                flexDirection: "row",
            },

            cell: {
                boxSizing: "border-box",

                borderRightWidth: 1,
                borderBottomWidth: 1,
                borderRightColor: styleConstants.black,
                borderBottomColor: styleConstants.black,
                borderRightStyle: "solid",
                borderBottomStyle: "solid",

                width: styleConstants.cellWidth,
                height: styleConstants.cellHeight,
            },

            cellFilled: {

            },
        };

        const cells = this.props.row.map((cell, i) => {
            // Colors?
            return <div style={styles.cell} key={i} />;
        });

        return <div style={styles.row}>
            {cells}
        </div>;
    }
}
Row.propTypes = {
    row: PropTypes.arrayOf(PropTypes.number).isRequired,
};


class Grid extends Component {
    render() {
        const styles = {
            grid: {
                boxSizing: "border-box",

                borderLeftWidth: 1,
                borderTopWidth: 1,
                borderLeftColor: styleConstants.black,
                borderTopColor: styleConstants.black,
                borderLeftStyle: "solid",
                borderTopStyle: "solid",
            },
        };

        const rows = this.props.grid.map((row, i) => {
            return <Row row={row} key={i} />;
        });

        return <div style={styles.grid}>
            {rows}
        </div>;
    }
}
Grid.propTypes = {
    grid: PropTypes.arrayOf(Row.propTypes.row).isRequired,
};


export class Picross extends Component {
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
Picross.propTypes = {
    puzzle: PropTypes.shape({
        columnLabels: ColumnLabels.propTypes.labels.isRequired,
        rowLabels: RowLabels.propTypes.labels.isRequired,
        grid: Grid.propTypes.grid.isRequired,
    }).isRequired,
};
