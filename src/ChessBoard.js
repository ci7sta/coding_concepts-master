import React, {Component} from 'react';
import AlphabeticIndex from './AlphabeticIndex'
import TableComponent from './TableComponent';
import Character from './Character';

class ChessBoard extends Component {
    constructor(props) {
        super(props);
        this.width = 8;
        this.height = 8;
        this.collected = 0;
        this.moves = 0;
    }

    render() {
        return (
            <div>
                <TableComponent data={this.generateTable()} id={this.props.id} ref={this.tableRef}/>
                <Character ref={this.props.characterRef}/>
                <p ref="objective">{this.props.config.rules}</p>
            </div>
        );
    }

    checkPosForColour() {
        debugger;

        var tableData = this.generateTable();
        var xPos = this.props.characterRef.current.state.position.x;
        var yPos = this.props.characterRef.current.state.position.y;

        console.log(tableData.rows[xPos - 1][yPos]);

        if (tableData.rows[yPos - 1][xPos] !== "" && tableData.rows[yPos - 1][xPos].props.style.color !== undefined) {
            if (tableData.rows[yPos - 1][xPos].props.style.color === this.props.config.primaryColour) {
                tableData.rows[yPos - 1][xPos] = <span></span>;
                this.collected++;
            }
        }

        this.moves++;

        if (this.collected === 6) {
            alert("Win! It took you " + this.moves + " moves to get all the colours. Press \"New game\" to play again");
        }
    }

    directionClick(e) {
        this.characterRef.current.moveForward();
    }

    generateTable() {
        var tableData = {
            columns: this.generateHeaders(),
            rows: [
                ["1", "", "", "", "", "", "", "", ""],
                ["2", "", "", "", "", "", "", "", ""],
                ["3", "", "", "", "", "", "", "", ""],
                ["4", "", "", "", "", "", "", "", ""],
                ["5", "", "", "", "", "", "", "", ""],
                ["6", "", "", "", "", "", "", "", ""],
                ["7", "", "", "", "", "", "", "", ""],
                ["8", "", "", "", "", "", "", "", ""]
            ]
        };

        let alphabeticIndex = new AlphabeticIndex();
        Object.keys(this.props.config.setup).forEach(coord => {
            var col = alphabeticIndex.getCharIndex(coord[0]);
            var row = +coord[1];
            tableData.rows[row - 1][col + 1] = <span style={{color: this.props.config.setup[coord]}}>&#9679;</span>;
        });

        return tableData;
    }

    setObjective() {

    }

    generateHeaders() {
        let alphabeticIndex = new AlphabeticIndex();
        return [" "].concat(alphabeticIndex.getIndexArray(this.width));
    }
}

export default ChessBoard;
