import React from "react";

export default function QuestionAnswer({ isAnswerCorrect }) {
  if (isAnswerCorrect) {
    return <h1>Correct</h1>;
  } else {
    return <h1>too bad</h1>;
  }
}
