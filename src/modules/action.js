import Axios from "axios";
import decodeHTML from "../middleware/decodeHTML";

// types of action
const Types = {
  SET_NAME: "SET_NAME",
  ADD_QUESTION: "ADD_QUESTION",
  FETCH_QUESTIONS_SUC: "FETCH_QUESTIONS_SUC",
  FETCH_QUESTIONS_ERR: "FETCH_QUESTIONS_ERR",
  ANSWER: "ANSWER",
  SET_QUIZ_TYPE: "SET_QUIZ_TYPE",
  SET_GIF: "SET_GIF",
  QUESTION_ANSWERED: "QUESTION_ANSWERED",
  QUESTION_ANSWERED_CORRECTLY: "QUESTION_ANSWERED_CORRECTLY"
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

async function fetchGif(isCorrectAnswer) {
  let url = null;
  if (isCorrectAnswer) {
    url =
      "https://api.giphy.com/v1/gifs/search?api_key=dQVDGFWr8t7MnnyMg1Jbmb2pNlTD3pOj&q=right&limit=25&offset=0&rating=G&lang=en";
  } else {
    url =
      "https://api.giphy.com/v1/gifs/search?api_key=dQVDGFWr8t7MnnyMg1Jbmb2pNlTD3pOj&q=wrong&limit=25&offset=0&rating=G&lang=en";
  }
  const giphyData = await Axios.get(`${url}`);
  const max = giphyData.data.pagination.count - 1;
  const randomNumber = Math.floor(Math.random() * (max - 0 + 1)) + 0;
  return giphyData.data.data[randomNumber].images.fixed_height.url;
}

const setQuizType = quizType => ({
  type: Types.SET_QUIZ_TYPE,
  quizType
});

const questionAnswered = questionHasBeenAnswered => ({
  type: Types.QUESTION_ANSWERED,
  questionHasBeenAnswered
});

function determineQuestionAnsweredCorrectly(answer) {
  return async function(dispatch, getState) {
    const {
      questions: { data },
      currentQuestion
    } = getState();
    if (answer === data[currentQuestion].correct_answer) {
      dispatch({
        type: Types.QUESTION_ANSWERED_CORRECTLY,
        isAnswerCorrect: true
      });

      const gifUrl = await fetchGif(true);
      dispatch({ type: Types.SET_GIF, gifUrl });
    } else {
      dispatch({
        type: Types.QUESTION_ANSWERED_CORRECTLY,
        isAnswerCorrect: false
      });
      const gifUrl = await fetchGif(false);
      dispatch({ type: Types.SET_GIF, gifUrl });
    }
  };
}

export default {
  setName,
  setQuizType,
  fetchQuestions,
  questionAnswered,
  determineQuestionAnsweredCorrectly,
  Types
};
