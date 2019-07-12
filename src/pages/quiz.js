import React, { Component } from "react";
import ACTIONS from "../modules/action";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  questions: state.questions
});

const mapDispatchToProps = dispatch => ({
  setQuestions: () => dispatch(ACTIONS.setQuestions())
});

class Quiz extends Component {
  state = {
    questions: []
  };

  componentWillMount() {
    this.props.setQuestions();
  }

  render() {
    return (
      <div>
        <h1>Quiz</h1>
        <ul>
          {this.props.questions.map(item => {
            return <li key={item.question}>{item.question}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
