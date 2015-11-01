import React, { Component, PropTypes } from "react";
import styleConstants, { fontStyles } from "./style-constants";

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

export { RowLabels, ColumnLabels };
