import React from "react";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";

function NextButton({ goToNext, currentQuestion, history }) {
  console.log(history);
  console.log(currentQuestion);
  if (currentQuestion >= 2) {
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            history.push("/results");
          }}
        >
          Results
          <ArrowForwardIos />
        </Button>
      </div>
    );
  } else {
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            goToNext();
          }}
        >
          Next
          <ArrowForwardIos />
        </Button>
      </div>
    );
  }
}

export default withRouter(NextButton);
