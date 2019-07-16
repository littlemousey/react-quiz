import React, { Component } from "react";

class Question extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.question}</h3>
      </div>
    );
  }
}

export default Question;
