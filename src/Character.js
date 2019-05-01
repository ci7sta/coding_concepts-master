import React, {Component} from 'react';
import character from './images/character.svg';
import {relative} from 'path';

class Character extends Component {

    constructor(props) {
        super(props);
        this.state = {
            position: {
                x: 1,
                y: 1
            },
            positionOffset: {
                top: -406,
                left: -227
            },
            collected: 0,
            moves: []
        };
    }

    resetPosition() {
        // Reset the position and collected colours
        alert("You went off the board. Resetting position...");
        this.state.collected = 0;
        this.state.position.x = 1;
        this.state.position.y = 1;
        this.state.positionOffset.top = -406;
        this.state.positionOffset.left = -227;
        this.setState(this.state);
    }

    moveForward() {

        if (this.state.position.y !== 8) {
            this.state.position.y++;
            this.state.positionOffset.top += 51;
            this.setState(this.state);
        } else {
            this.resetPosition();
        }
    }

    moveBack() {
        if (this.state.position.y !== 1) {
            this.state.position.y--;
            this.state.positionOffset.top -= 51;
            this.setState(this.state);
        } else {
            this.resetPosition();
        }
    }

    moveLeft() {
        if (this.state.position.x !== 1) {
            this.state.position.x--;
            this.state.positionOffset.left -= 51;
            this.setState(this.state);
        } else {
            this.resetPosition();
        }
    }

    moveRight() {
        if (this.state.position.x !== 8) {
            this.state.position.x++;
            this.state.positionOffset.left += 51;
            this.setState(this.state);
        } else {
            this.resetPosition();
        }
    }


    render() {
        var style = {
            margin: "0",
            position: "relative",
            left: this.state.positionOffset.left.toString().concat("px"),
            top: this.state.positionOffset.top.toString().concat("px")
        };

        return (
            <img src={character} alt="character" width="50px" id="character" style={style}/>
        );
    }
}

export default Character;
