import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ACTIONS from "../modules/action";

const mapStateToProps = state => ({
  namePlayer: state.namePlayer,
  resultsData: state.resultsData
});

const mapDispatchToProps = dispatch => ({
  restartGame: () => dispatch(ACTIONS.restartGame())
});

const userAnswerFeedback = answeredCorrectly => {
  if (answeredCorrectly) {
    return "right";
  } else {
    return "wrong";
  }
};
class Results extends Component {
  render() {
    const { namePlayer, resultsData } = this.props;
    return (
      <div>
        <Typography variant="h3" component="h2">
          Hi {namePlayer}!
        </Typography>
        <Typography variant="h3" component="h2">
          Here are your results
        </Typography>
        {resultsData.map((result, index) => {
          return (
            <div key={index}>
              <Typography variant="h5" component="h3">
                {result.question}
              </Typography>
              <p>Your answer: {result.answer}</p>
              <p>Correct answer: {result.rightAnswer}</p>
              <p>
                Your answer was{" "}
                <span style={{ fontWeight: "bold" }}>
                  {userAnswerFeedback(result.answeredCorrectly)}
                </span>
              </p>
            </div>
          );
        })}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            this.props.history.push("/options");
          }}
        >
          Restart game
        </Button>
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Results)
);
