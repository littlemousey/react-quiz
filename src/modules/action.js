// types of action
const Types = {
  ADD_QUESTION: "ADD_QUESTION"
};
// actions
const addQuestion = question => ({
  type: Types.ADD_QUESTION,
  question
});

async function getQuestions() {
  return await fetch("https://opentdb.com/api.php?amount=10");
}

function setQuestions() {
  return function(dispatch) {
    return getQuestions().then(result =>
      result.data.results.forEach(item => {
        dispatch(addQuestion(item));
      })
    );
  };
}

export default {
  setQuestions,
  Types
};
