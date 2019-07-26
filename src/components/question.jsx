import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import AnswerButtons from "./answerButtons";

const StyledCard = styled(Card)`
  width: 850px;
  margin: 20px auto;
  padding: 10px;
`;

class Question extends Component {
  render() {
    const {
      answers,
      question,
      correctAnswer,
      questionAnswered,
      answerQuestion
    } = this.props;

    return (
      <div>
        <StyledCard>
          <CardContent>
            <Typography variant="h5" component="h2">
              {question}
            </Typography>
            <AnswerButtons
              answers={answers}
              correctAnswer={correctAnswer}
              questionAnswered={questionAnswered}
              answerQuestion={answerQuestion}
            />
          </CardContent>
        </StyledCard>
      </div>
    );
  }
}
export default Question;
