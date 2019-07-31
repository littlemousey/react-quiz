import React, { Component } from "react";
import ACTIONS from "../modules/action";
import { connect } from "react-redux";
import Question from "../components/question";
import Typography from "@material-ui/core/Typography";
import QuestionAnswer from "../components/questionAnswer";
import NextButton from "../components/nextButton";
import PropTypes from "prop-types";
import decodeHTML from "../middleware/decodeHTML";

const mapStateToProps = state => ({
  questions: state.questions,
  currentQuestion: state.currentQuestion,
  questionHasBeenAnswered: state.questionHasBeenAnswered,
  isAnswerCorrect: state.isAnswerCorrect,
  gifUrl: state.gifUrl
});

const mapDispatchToProps = dispatch => ({
  fetchQuestions: () => dispatch(ACTIONS.fetchQuestions()),
  questionAnswered: questionHasBeenAnswered =>
    dispatch(ACTIONS.questionAnswered(questionHasBeenAnswered)),
  checkAnswerCorrect: answer =>
    dispatch(ACTIONS.determineQuestionAnsweredCorrectly(answer)),
  increaseQuestionNumber: () => dispatch(ACTIONS.setQuestion()),
  setAnswerToFalse: () => dispatch(ACTIONS.setAnswerToFalse()),
  resetGiphy: () => dispatch(ACTIONS.resetGiphy())
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

  goToNextQuestion = () => {
    this.props.questionAnswered(false);
    this.props.increaseQuestionNumber();
    this.props.setAnswerToFalse();
    this.props.resetGiphy();
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
        <Typography variant="h5" component="h2">
          Question number {currentQuestionIndex + 1}
        </Typography>
        <Question
          question={currentQuestion.question}
          answers={currentQuestion.answers}
          correctAnswer={decodeHTML(currentQuestion.correct_answer)}
          currentQuestionIndex={currentQuestionIndex}
          answerQuestion={this.determineAnswerIsCorrect}
          questionAnswered={this.props.questionHasBeenAnswered}
        />
        {this.props.questionHasBeenAnswered && (
          <React.Fragment>
            <QuestionAnswer
              isAnswerCorrect={this.props.isAnswerCorrect}
              gifUrl={this.props.gifUrl}
            />
            <NextButton
              currentQuestion={this.props.currentQuestion}
              goToNext={this.goToNextQuestion}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
