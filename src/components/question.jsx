import React, { Component } from "react";
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
    const { options, question } = this.props;

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
      </div>
    );
  }
}

export default Question;
