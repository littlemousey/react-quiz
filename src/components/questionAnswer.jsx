import React from "react";
import Typography from "@material-ui/core/Typography";

export default function QuestionAnswer({ isAnswerCorrect, gifUrl }) {
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
