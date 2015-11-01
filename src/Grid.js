import React, { Component, PropTypes } from "react";

import { styleConstants, fontStyles } from "./style-constants";
import { CellStates } from "./actions";

const { FILLED, EMPTY, CHECKED } = CellStates;


class Cell extends Component {
    handleClick() {
        const getNextState = () => {
            // Checked cells stay checked
            if (this.props.value === CHECKED) {
                return CHECKED;
            }

            // Filled/empty cells toggle
            if (this.props.value === FILLED) {
                return EMPTY;
            } else {
                return FILLED;
            }
        };

        this.props.onCellChange(getNextState());
    }

    handleDoubleClick() {
        const getNextState = () => {
            // Filled cells stay filled
            if (this.props.value === FILLED) {
                return FILLED;
            }

            // Checked/empty cells toggle
            if (this.props.value === CHECKED) {
                return EMPTY;
            } else {
                return CHECKED;
            }
        };

        this.props.onCellChange(getNextState());
    }

    render() {
        const styles = {
            cell: {
                ...fontStyles,

                boxSizing: "border-box",

                borderRightWidth: 1,
                borderBottomWidth: 1,
                borderRightColor: styleConstants.black,
                borderBottomColor: styleConstants.black,
                borderRightStyle: "solid",
                borderBottomStyle: "solid",

                width: styleConstants.cellWidth,
                height: styleConstants.cellHeight,

                textAlign: "center",

                userSelect: "none",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
            },

            cellFilled: {
                backgroundColor: styleConstants.black,
            },

            cellCrossed: {
                color: styleConstants.gray,
            },
        };

        const style = {
            ...styles.cell,
            ...(this.props.value === FILLED && styles.cellFilled),
            ...(this.props.value === CHECKED && styles.cellCrossed),
        }

        return (
            <div style={style}
                 onClick={() => this.handleClick()}
                 onDoubleClick={() => this.handleDoubleClick()}>
                {(this.props.value === CHECKED) && "X"}
            </div>
        );
    }
}
Cell.propTypes = {
    value: PropTypes.oneOf([FILLED, EMPTY, CHECKED]).isRequired,
    onCellChange: PropTypes.func.isRequired,
};


class Row extends Component {
    render() {
        const style = {
            display: "flex",
            flexDirection: "row",
        };

        const cells = this.props.row.map((cell, i) => {
            const onCellChange = (state) => {
                this.props.onCellChange(i, state);
            };

            return <Cell value={cell} key={i} onCellChange={onCellChange} />;
        });

        return <div style={style}>
            {cells}
        </div>;
    }
}
Row.propTypes = {
    row: PropTypes.arrayOf(Cell.propTypes.value).isRequired,
    onCellChange: PropTypes.func.isRequired,
};


export default class Grid extends Component {
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
            const onCellChange = (column, state) => {
                this.props.onCellChange(i, column, state);
            };

            return <Row row={row} key={i} onCellChange={onCellChange} />;
        });

        return <div style={styles.grid}>
            {rows}
        </div>;
    }
}
Grid.propTypes = {
    grid: PropTypes.arrayOf(Row.propTypes.row).isRequired,
    onCellChange: PropTypes.func.isRequired,
};
