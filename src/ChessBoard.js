import React, {Component} from 'react';
import AlphabeticIndex from './AlphabeticIndex'
import TableComponent from './TableComponent';
import Character from './Character';

class ChessBoard extends Component {
    constructor(props) {
        super(props);
        this.width = 8;
        this.height = 8;
        this.collected = [];
        this.moves = 0;
        this.tableData = undefined;
    }

    render() {

        if (this.tableData === undefined) {
            return (
                <div>
                    <TableComponent data={this.generateTable()} id={this.props.id} ref={this.tableRef}/>
                    <Character ref={this.props.characterRef}/>
                    <p ref="objective">{this.props.config.rules}</p>
                </div>
            );
        } else {
            return (
                <div>
                    <TableComponent data={this.tableData} id={this.props.id} ref={this.tableRef}/>
                    <Character ref={this.props.characterRef}/>
                    <p ref="objective">{this.props.config.rules}</p>
                </div>
            );
        }
    }

    checkPosForColour() {

        var tableData = this.generateTable();
        var xPos = this.props.characterRef.current.state.position.x;
        var yPos = this.props.characterRef.current.state.position.y;

        console.log(tableData.rows[xPos - 1][yPos]);

        // If the table has a colour and that colour matches our position, and the colour is the target colour,
        // and we haven't collect it before, add one to our collected count
        if (tableData.rows[yPos - 1][xPos] !== "" && tableData.rows[yPos - 1][xPos].props.style.color !== undefined) {
            var alreadyCollected = this.collected.indexOf(xPos + "" + yPos);
            if (tableData.rows[yPos - 1][xPos].props.style.color === this.props.config.primaryColour && alreadyCollected < 0) {
                debugger;
                tableData.rows[yPos - 1][xPos] = "";
                this.props.characterRef.current.state.collected++;

                // Add the collected piece to memory
                this.collected.push(xPos + "" + yPos);
            }
        }

        this.moves++;

        // We got all the target colours
        if (this.props.characterRef.current.state.collected === 6) {
            alert("Win! It took you " + this.moves + " moves to get all the colours. Press \"New game\" to play again");
        }
        this.render();
    }

    directionClick(e) {
        this.characterRef.current.moveForward();
    }

    generateTable() {

        // This table had one too many rows (bug 1)
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
