import React from "react";
export default class Square extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { number, squars, handleClick } = this.props;
    return (
      <button className="square" onClick={() => handleClick(number)}>
        {squars[number]}
      </button>
    );
  }
}
