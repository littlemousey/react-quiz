import React from "react";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import Button from "@material-ui/core/Button";

export default function NextQuestion() {
  return (
    <div>
      <Button variant="contained" color="primary">
        Next
        <ArrowForwardIos />
      </Button>
    </div>
  );
}
