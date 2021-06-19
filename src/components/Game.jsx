import React from "react";
import Board from "./Board";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextPlayer: "X",
      squares: Array(9).fill(null),
      winner: null,
      history: [Array(9).fill(null)],
      currentIndex: 0,
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
    let currentIndex = this.state.currentIndex;
    let history = this.state.history.slice();
    // check to see if game is over or squre has already been filled
    const isWinner = this.state.winner && currentIndex === history.length;
    if (this.state.squares[index] || this.state.winner || isWinner) return;

    // changing squares array with new move
    const squares = this.state.squares.slice();
    squares[index] = this.state.nextPlayer;

    // Changing history
    if (currentIndex !== history.length)
      history = history.slice(0, currentIndex + 1);

    currentIndex++;
    console.log(currentIndex, history.length);
    //saving history
    history.push(squares);

    // changing player
    const nextPlayer = this.state.nextPlayer === "O" ? "X" : "O";

    // calculating winner
    const winner = this.calculateWinner(squares);

    // Changing state
    this.setState({ winner, nextPlayer, squares, history, currentIndex });
  };

  // Time Travel feature
  jumpTo = (move, index) => {
    // Check to see if there is a winner in current move
    const winner = this.calculateWinner(move);
    // changing nextPlayer to state of that move
    const nextPlayer = index % 2 === 0 ? "X" : "O";

    this.setState({ squares: move, currentIndex: index, winner, nextPlayer });
  };
  render() {
    const { history, squares, nextPlayer, winner } = this.state;
    const status = winner
      ? "Winner is " + winner
      : "Next player: " + nextPlayer;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            onHistoryChange={this.handleHistoryChange}
            squares={squares}
            handleClick={this.handleClick}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>
            {history.map((move, index) => (
              <li key={index + ""}>
                <button onClick={() => this.jumpTo(move, index)}>
                  {index === 0 ? "Go to game start" : "Move #" + index}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
