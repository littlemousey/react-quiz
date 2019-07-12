import Axios from "axios";

// types of action
const Types = {
  ADD_QUESTION: "ADD_QUESTION"
};
// actions
const addQuestion = question => ({
  type: Types.ADD_QUESTION,
  question
});

function getQuestions() {
  return Axios.get("https://opentdb.com/api.php?amount=10");
}

function setQuestions() {
  return function(dispatch) {
    return getQuestions().then(result =>
      dispatch(addQuestion(result.data.results))
    );
  };
}

export default {
  setQuestions,
  Types
};
