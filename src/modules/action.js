import Axios from "axios";
import decodeHTML from "../middleware/decodeHTML";

// types of action
const Types = {
  SET_NAME: "SET_NAME",
  ADD_QUESTION: "ADD_QUESTION",
  FETCH_QUESTIONS_SUC: "FETCH_QUESTIONS_SUC",
  FETCH_QUESTIONS_ERR: "FETCH_QUESTIONS_ERR",
  CORRECT_ANSWER: "CORRECT_ANSWER",
  WRONG_ANSWER: "WRONG_ANSWER",
  SET_QUIZ_TYPE: "SET_QUIZ_TYPE"
};

const setName = name => ({
  type: Types.SET_NAME,
  name
});

function getQuestions() {
  return Axios.get("https://opentdb.com/api.php?amount=10");
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function fetchQuestions() {
  return function(dispatch) {
    return getQuestions()
      .then(result => {
        const questions = {};

        result.data.results.forEach((item, i) => {
          const decodedQuestion = decodeHTML(item.question); // sanatize question
          const question = { ...item, question: decodedQuestion, id: i };
          console.log("sanatized: ", question);
          question.answers = shuffle([
            ...question.incorrect_answers,
            question.correct_answer
          ]);
          questions[question.id] = question;
        });

        dispatch({ type: Types.FETCH_QUESTIONS_SUC, questions });
      })
      .catch(err => {
        dispatch({ type: Types.FETCH_QUESTIONS_ERR, error: err.message });
      });
  };
}

function answerQuestion(questionIndex, answer) {
  return function(dispatch, getState) {
    const questions = getState().questions.data;
    const question = questions[questionIndex];
    if (question.correct_answer === answer) {
      dispatch({ type: Types.CORRECT_ANSWER, questionIndex });
    } else {
      dispatch({ type: Types.WRONG_ANSWER, questionIndex });
    }
  };
}

const setQuizType = quizType => ({
  type: Types.SET_QUIZ_TYPE,
  quizType
});
export default {
  setName,
  setQuizType,
  fetchQuestions,
  answerQuestion,
  Types
};
