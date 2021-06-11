import React from "react";
import Board from "./Board";

export default class Game extends React.Component {
  state = {
    nextPlayer: "X",
    squars: Array(9).fill(null),
  };

  handleClick = (number) => {
    if (this.state.squars[number]) return;

    const squars = this.state.squars.map((square, index) => {
      if (index === number) return this.state.nextPlayer;

      return square;
    });

    const nextPlayer = this.state.nextPlayer === "O" ? "X" : "O";

    this.setState({ nextPlayer, squars });
  };
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            nextPlayer={this.state.nextPlayer}
            squars={this.state.squars}
            handleClick={this.handleClick}
          />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
