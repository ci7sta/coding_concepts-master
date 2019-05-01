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
        var input = this.refs.commandInput.value.toLowerCase().replace(/ /g,'');

        if (input === "forward();") {
            this.forwardClick();
        } else if (input === "back();") {
            this.backwardClick();
        } else if (input === "left();") {
            this.leftClick();
        } else if (input === "right();") {
            this.rightClick();
        } else {
            this.refs.commandInput.value = input + " is not correct.";
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
