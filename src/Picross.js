import React, { PropTypes, Component } from "react";

const styleConstants = {
    cellWidth: 15,
    cellHeight: 15,
    labelContainerSize: 60,
    black: "#000000",
    white: "#ffffff",
    gray: "#777777",
};

const fontStyles = {
    color: styleConstants.black,
    fontSize: 12,
    fontFamily: "monospace",
};

class LabelCell extends Component {
    render() {
        const style = {
            ...fontStyles,
            boxSizing: "border-box",
            textAlign: "center",
            width: styleConstants.cellWidth,
            height: styleConstants.cellHeight,
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


class Cell extends Component {
    render() {
        const styles = {
            cell: {
                ...fontStyles,

                boxSizing: "border-box",
                color: styleConstants.white,

                borderRightWidth: 1,
                borderBottomWidth: 1,
                borderRightColor: styleConstants.black,
                borderBottomColor: styleConstants.black,
                borderRightStyle: "solid",
                borderBottomStyle: "solid",

                width: styleConstants.cellWidth,
                height: styleConstants.cellHeight,

                textAlign: "center",
            },

            cellFilled: {
                backgroundColor: styleConstants.black,
                color: styleConstants.black,
            },

            cellCrossed: {
                color: styleConstants.gray,
            },
        };

        const style = {
            ...styles.cell,
            ...(this.props.value === 1 && styles.cellFilled),
            ...(this.props.value === 2 && styles.cellCrossed),
        }

        return <div style={style}>
            X
        </div>;
    }
}
Cell.propTypes = {
    value: PropTypes.number.isRequired,
};


class Row extends Component {
    render() {
        const style = {
            display: "flex",
            flexDirection: "row",
        };

        const cells = this.props.row.map((cell, i) => {
            return <Cell value={cell} key={i} />;
        });

        return <div style={style}>
            {cells}
        </div>;
    }
}
Row.propTypes = {
    row: PropTypes.arrayOf(Cell.propTypes.value).isRequired,
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
