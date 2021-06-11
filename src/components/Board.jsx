import React from "react";
import Square from "./Square";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextPlayer: "X",
      squares: Array(9).fill(null),
      winner: null,
    };
  }

  // calculateWinner of game after every move:
  //result is one of these(null ,X ,O)
  calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let winner = null;
    lines.forEach((line) => {
      // Checking every winning pattern to see if it exists
      const [a, b, c] = line;

      if (
        squares[a] !== null &&
        squares[a] === squares[b] &&
        squares[b] === squares[c]
      )
        return (winner = squares[a]);
    });
    return winner;
  };

  // handleClick for squares
  handleClick = (index) => {
    // check to see if game is over or squre has already been filled
    if (this.state.squares[index] || this.state.winner) return;

    // changing squares array with new move
    const squares = this.state.squares.slice();
    squares[index] = this.state.nextPlayer;

    // changing player
    const nextPlayer = this.state.nextPlayer === "O" ? "X" : "O";

    // calculating winner
    const winner = this.calculateWinner(squares);

    this.setState({ winner, nextPlayer, squares });
  };

  // rendering squares
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const { nextPlayer, winner } = this.state;
    let status = winner ? "Winner is " + winner : "Next player: " + nextPlayer;

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
