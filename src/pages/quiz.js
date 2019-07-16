import React, { Component } from "react";
import ACTIONS from "../modules/action";
import { connect } from "react-redux";
import Question from "../components/question";

const mapStateToProps = state => ({
  questions: state.questions,
  currentQuestion: state.currentQuestion
});

const mapDispatchToProps = dispatch => ({
  fetchQuestions: () => dispatch(ACTIONS.fetchQuestions()),
  answerQuestion: (index, answer) =>
    dispatch(ACTIONS.answerQuestion(index, answer))
});

class Quiz extends Component {
  componentWillMount() {
    this.props.fetchQuestions();
  }

  render() {
    const currentQuestionIndex = this.props.currentQuestion;
    const currentQuestion = this.props.questions.data[currentQuestionIndex];

    if (!currentQuestion) {
      return null;
    }

    return (
      <div>
        <h1>Quiz</h1>
        <Question question={currentQuestion.question} />
        {currentQuestion.answers.map(answer => (
          <button
            key={answer}
            onClick={() =>
              this.props.answerQuestion(currentQuestionIndex, answer)
            }
          >
            {answer}
          </button>
        ))}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
