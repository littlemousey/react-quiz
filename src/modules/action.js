import Axios from "axios";
import decodeHTML from "../middleware/decodeHTML";

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
      result.data.results.forEach(item => {
        const question = decodeHTML(item.question); // sanatize question
        const sanatizedItem = { ...item, question };
        console.log("sanatized: ", sanatizedItem);
        dispatch(addQuestion(sanatizedItem));
      })
    );
  };
}

export default {
  setQuestions,
  Types
};
