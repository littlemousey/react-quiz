import React, { Component } from "react";
import ACTIONS from "../modules/action";
import { connect } from "react-redux";
import Question from "../components/question";
import Typography from "@material-ui/core/Typography";
import QuestionAnswer from "../components/questionAnswer";
import PropTypes from "prop-types";

const mapStateToProps = state => ({
  questions: state.questions,
  currentQuestion: state.currentQuestion,
  questionHasBeenAnswered: state.questionHasBeenAnswered,
  isAnswerCorrect: state.isAnswerCorrect
});

const mapDispatchToProps = dispatch => ({
  fetchQuestions: () => dispatch(ACTIONS.fetchQuestions()),
  questionAnswered: questionHasBeenAnswered =>
    dispatch(ACTIONS.questionAnswered(questionHasBeenAnswered)),
  checkAnswerCorrect: answer =>
    dispatch(ACTIONS.determineQuestionAnsweredCorrectly(answer))
});

class Quiz extends Component {
  static propTypes = {
    questions: PropTypes.object,
    currentQuestion: PropTypes.number
  };

  componentWillMount() {
    this.props.fetchQuestions();
  }

  determineAnswerIsCorrect = answer => {
    this.props.questionAnswered(true);
    this.props.checkAnswerCorrect(answer);
  };

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
          answerQuestion={this.determineAnswerIsCorrect}
        />
        {this.props.questionHasBeenAnswered && (
          <QuestionAnswer isAnswerCorrect={this.props.isAnswerCorrect} />
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
