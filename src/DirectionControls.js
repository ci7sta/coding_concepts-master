import React, {Component} from 'react';
import left_arrow from './images/left_arrow.svg';

class DirectionControls extends Component {

    forwardClick(e) {
        //instance of Character.js injected as property during instantiation
        var character = this.props.characterRef.current;
        var board = this.props.boardRef.current;
        character.moveForward();
        board.checkPosForColour();
    }

    backwardClick(e) {
        //instance of Character.js injected as property during instantiation
        var character = this.props.characterRef.current;
        var board = this.props.boardRef.current;
        character.moveBack();
        board.checkPosForColour();
    }

    leftClick(e) {
        //instance of Character.js injected as property during instantiation
        var character = this.props.characterRef.current;
        var board = this.props.boardRef.current;
        character.moveLeft();
        board.checkPosForColour();
    }

    rightClick(e) {
        //instance of Character.js injected as property during instantiation
        var character = this.props.characterRef.current;
        var board = this.props.boardRef.current;
        character.moveRight();
        board.checkPosForColour();
    }

    handleInput() {
        var input = this.refs.commandInput.value.toLowerCase().replace(/ /g, '');

        // Separate commands into array of commands using ; delimiter
        var commands = input.split(";");

        for (var commandIndex = 0; commandIndex < commands.length; commandIndex++) {

            // get the text and the number (if there is one)
            var number = parseInt(commands[commandIndex].replace(/[^\d.]/g, ''), 10);
            var text = commands[commandIndex].replace(/[0-9]/g, '');

            if(!isNaN(number) && number >= 8) {
                alert("Number of spaces to move is too high!");
                return;
            }

            // Match the commmand to the function which moves the character in the chosen direction
            // execute multiple times if necessary

            if (text === "forward()") {

                if (isNaN(number)) {
                    this.forwardClick();
                }
                for (var i = 0; i < number; i++) {
                    this.forwardClick();
                }
            } else if (text === "back()") {
                if (isNaN(number)) {
                    this.backwardClick();
                }
                for (var i = 0; i < number; i++) {
                    this.backwardClick();
                }
            } else if (text === "left()") {
                if (isNaN(number)) {
                    this.leftClick();
                }
                for (var i = 0; i < number; i++) {
                    this.leftClick();
                }
            } else if (text === "right()") {
                if (isNaN(number)) {
                    this.rightClick();
                }
                for (var i = 0; i < number; i++) {
                    this.rightClick();
                }
            } else if (text === "") {
                return;
            } else {
                alert(input + " is not correct syntax.");
                this.refs.commandInput.value = "";
                return;
            }
        }
    }

    render() {
        return (
            <div id="directionControls" class="columnLayout">
                <div class="rowLayout">
                    <img src={left_arrow} class="arrow backArrow" onClick={(e) => this.backwardClick(e)}/>
                    <div class="columnLayout">
                        <img src={left_arrow} class="arrow" onClick={(e) => this.leftClick(e)}/>
                        <img src={left_arrow} class="arrow forwardArrow" onClick={(e) => this.forwardClick(e)}/>
                        <img src={left_arrow} class="arrow rightArrow" onClick={(e) => this.rightClick(e)}/>
                    </div>
                    <div class="columnLayout">
                        <input type="text" id="commandInput" ref="commandInput"/>
                        <button onClick={(e) => this.handleInput(e)}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default DirectionControls;
