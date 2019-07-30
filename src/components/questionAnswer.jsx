import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import playSound from "../utils/playSound";

class QuestionAnswer extends Component {
  componentDidUpdate() {
    playSound(this.props.isAnswerCorrect);
  }
  render() {
    const { isAnswerCorrect, gifUrl } = this.props;
    if (isAnswerCorrect) {
      return (
        <div>
          <Typography variant="h5" component="h2">
            Correct
          </Typography>
          <img src={gifUrl} alt="Right answer giphy" />
        </div>
      );
    } else {
      return (
        <div>
          <Typography variant="h5" component="h2">
            Too bad!
          </Typography>
          <img src={gifUrl} alt="Wrong answer giphy" />
        </div>
      );
    }
  }
}

export default QuestionAnswer;
