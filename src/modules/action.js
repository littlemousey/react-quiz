import Axios from "axios";
import decodeHTML from "../middleware/decodeHTML";

// types of action
const Types = {
  ADD_QUESTION: "ADD_QUESTION",
  CHANGE_NAME: "CHANGE_NAME"
};
// actions
const addQuestion = question => ({
  type: Types.ADD_QUESTION,
  question
});

const changeName = name => ({
  type: Types.CHANGE_NAME,
  name
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
  changeName,
  setQuestions,
  Types
};
