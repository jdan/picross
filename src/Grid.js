import React, { Component, PropTypes } from "react";
import { styleConstants, fontStyles } from "./style-constants";

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


export class Grid extends Component {
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
