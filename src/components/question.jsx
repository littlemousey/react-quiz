import React, { Component } from "react";
import ACTIONS from "../modules/action";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";

const StyledCard = styled(Card)`
  width: 850px;
  margin: 20px auto;
  padding: 10px;
`;

class Question extends Component {
  render() {
    const {
      // currentQuestionIndex,
      // answerQuestion,
      options,
      question,
      answer,
      correctAnswer
    } = this.props;

    let message = null;

    if (answer) {
      if (answer === correctAnswer) {
        message = <h2>Correct</h2>;
      } else {
        message = (
          <div>
            <h2>Wrong Answer</h2>
            {/* <img src={this.props.gifUrl} alt="wrong answer" /> */}
          </div>
        );
      }
    }

    return (
      <div>
        <StyledCard>
          <CardContent>
            <Typography variant="h5" component="h2">
              {question}
            </Typography>
          </CardContent>
          <Grid container direction="row" justify="center" spacing={3}>
            {options.map(option => (
              <Grid item key={option}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.props.answerQuestion(option);
                  }}
                >
                  {option}
                </Button>
              </Grid>
            ))}
          </Grid>
        </StyledCard>
        {message}
      </div>
    );
  }
}

export default Question;
