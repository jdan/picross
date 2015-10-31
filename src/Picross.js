import React, { Component } from "react";
import types from "./prop-types";

const styleConstants = {
    cellWidth: 15,
    cellHeight: 15,

    labelContainerSize: 60,
};

const baseStyle = {
    fontSize: 12,
    fontFamily: "monospace",
};

class LabelCell extends Component {
    render() {
        const style = {
            boxSizing: "border-box",
            textAlign: "center",
            width: styleConstants.cellWidth,
            height: styleConstants.cellHeight,
            ...baseStyle,
        };

        return <div style={style}>
            {this.props.value}
        </div>;
    }
}
LabelCell.propTypes = {
    value: React.PropTypes.oneOfType([
        React.PropTypes.number,

        // Empty string
        React.PropTypes.string,
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
    label: types.label.isRequired,
    style: React.PropTypes.object,
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
    labels: types.labelList.isRequired,
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
    labels: types.labelList.isRequired,
};


export class Picross extends Component {
    render() {
        const styles = {
            topRow: {
                display: "flex",
            },

            spacer: {
                width: styleConstants.labelContainerSize,
                height: styleConstants.labelContainerSize,
            },
        }

        return <div>
            <div style={styles.topRow}>
                <div style={styles.spacer} />
                <ColumnLabels labels={this.props.puzzle.columnLabels} />
            </div>

            <RowLabels labels={this.props.puzzle.rowLabels} />
        </div>;
    }
}
Picross.propTypes = {
    puzzle: types.puzzle.isRequired,
};
