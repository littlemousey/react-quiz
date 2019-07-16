import React, { Component } from "react";
import ACTIONS from "../modules/action";
import { connect } from "react-redux";
import Question from "../components/question";
import Typography from "@material-ui/core/Typography";

const mapStateToProps = state => ({
  questions: state.questions,
  currentQuestion: state.currentQuestion
});

const mapDispatchToProps = dispatch => ({
  fetchQuestions: () => dispatch(ACTIONS.fetchQuestions())
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
        <Typography variant="h2" component="h1">
          Quiz
        </Typography>
        <Question
          question={currentQuestion.question}
          options={currentQuestion.answers}
          currentQuestionIndex={currentQuestionIndex}
          answer={currentQuestion.answer}
          correctAnswer={currentQuestion.correct_answer}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
