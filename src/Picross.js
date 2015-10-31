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

// A horizontal label annotating the cell makeup of a row
class RowLabel extends Component {
    render() {
        const style = {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
        };

        const contents = (this.props.label.length === 0) ?
            <LabelCell value={" "} /> :

            this.props.label.map((cell, i) => {
                return <LabelCell value={cell} key={i} />;
            });

        return <div style={style}>
            {contents}
        </div>
    }
};
RowLabel.propTypes = {
    label: types.label.isRequired,
};

// A list of row labels from top to bottom
class RowLabels extends Component {
    render() {
        const style = {
            width: styleConstants.labelContainerSize,
        };

        const labels = this.props.labels.map((label, i) => {
            return <RowLabel label={label} key={i} />;
        });

        return <div style={style}>
            {labels}
        </div>;
    }
}
RowLabels.propTypes = {
    labels: types.labelList.isRequired,
};


// A vertical label annotating the cell makeup of a row
class ColumnLabel extends Component {
    render() {
        const style = {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
        };

        const contents = (this.props.label.length === 0) ?
            <LabelCell value={" "} /> :

            this.props.label.map((cell, i) => {
                return <LabelCell value={cell} key={i} />;
            });

        return <div style={style}>
            {contents}
        </div>
    }
};
ColumnLabel.propTypes = {
    label: types.label.isRequired,
};

// A list of row labels from top to bottom
class ColumnLabels extends Component {
    render() {
        const style = {
            height: styleConstants.labelContainerSize,
            display: "flex",
            justifyContent: "flex-start",
        };

        const labels = this.props.labels.map((label, i) => {
            return <ColumnLabel label={label} key={i} />;
        });

        return <div style={style}>
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
