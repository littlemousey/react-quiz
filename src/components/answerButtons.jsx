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
      background: "green"
    }
  })(Button);

  return (
    <Grid container direction="row" justify="center" spacing={3}>
      {answers.map(answer => {
        const answeredCorrectly = answer === correctAnswer;
        return (
          <Grid item key={answer}>
            {questionAnswered && answeredCorrectly ? (
              <GreenButton variant="contained">{answer}</GreenButton>
            ) : (
              <Button
                variant="contained"
                color={"primary"}
                onClick={() => {
                  answerQuestion(answer);
                }}
              >
                {answer}
              </Button>
            )}
          </Grid>
        );
      })}
    </Grid>
  );
}
