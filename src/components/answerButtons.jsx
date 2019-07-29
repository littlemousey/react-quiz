import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";

export default function AnswerButtons({
  answers,
  correctAnswer,
  questionAnswered,
  answerQuestion
}) {
  const GreenButton = withStyles({
    root: {
      backgroundColor: "#27ae60",
      "&:hover": {
        backgroundColor: "#2ecc71"
      }
    }
  })(Button);

  const RedButton = withStyles({
    root: {
      backgroundColor: "#c0392b",
      "&:hover": {
        backgroundColor: "#e74c3c"
      }
    }
  })(Button);

  if (!questionAnswered) {
    return (
      <Grid container direction="row" justify="center" spacing={3}>
        {answers.map(answer => {
          return (
            <Grid item key={answer}>
              <Button
                variant="contained"
                color={"primary"}
                onClick={() => {
                  answerQuestion(answer);
                }}
              >
                {answer}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    );
  } else {
    return (
      <Grid container direction="row" justify="center" spacing={3}>
        {answers.map(answer => {
          const answeredCorrectly = answer === correctAnswer;
          return (
            <Grid item key={answer}>
              {questionAnswered && answeredCorrectly ? (
                <GreenButton variant="contained">{answer}</GreenButton>
              ) : (
                <RedButton variant="contained">{answer}</RedButton>
              )}
            </Grid>
          );
        })}
      </Grid>
    );
  }
}
