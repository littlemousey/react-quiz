import Axios from "axios";
import decodeHTML from "../middleware/decodeHTML";
import { shuffleArray } from "../utils/shuffleArray";
import { Types } from "./actionTypes";
import { mergeTwoArraysToOneDecodedArray } from "../utils/mergeTwoArraysToOneDecodedArray";

const setName = name => ({
  type: Types.SET_NAME,
  name
});

const setQuestion = () => ({
  type: Types.SET_CURRENT_QUESTION
});

async function getQuestions() {
  return await Axios.get("https://opentdb.com/api.php?amount=10");
}

function fetchQuestions() {
  return function(dispatch) {
    return getQuestions()
      .then(result => {
        const questions = {};
        result.data.results.forEach((item, i) => {
          const decodedQuestion = decodeHTML(item.question); // sanatize question

          const question = {
            ...item,
            question: decodedQuestion,
            id: i
          };

          const possibleAnswers = mergeTwoArraysToOneDecodedArray(
            question.incorrect_answers,
            [question.correct_answer]
          );
          // add new property answers
          question.answers = shuffleArray(possibleAnswers);
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

const setAnswerToFalse = () => ({
  type: Types.QUESTION_ANSWERED_CORRECTLY,
  isAnswerCorrect: false
});

const resetGiphy = () => ({
  type: Types.SET_GIF,
  gifUrl: ""
});

function determineQuestionAnsweredCorrectly(answer) {
  return async function(dispatch, getState) {
    const {
      questions: { data },
      currentQuestion
    } = getState();
    if (answer === decodeHTML(data[currentQuestion].correct_answer)) {
      dispatch({
        type: Types.QUESTION_ANSWERED_CORRECTLY,
        isAnswerCorrect: true
      });

      const gifUrl = await fetchGif(true);
      dispatch({ type: Types.SET_GIF, gifUrl });
      dispatch({ type: Types.ADD_RESULT_DATA, answer });
    } else {
      dispatch({
        type: Types.QUESTION_ANSWERED_CORRECTLY,
        isAnswerCorrect: false
      });
      const gifUrl = await fetchGif(false);
      dispatch({ type: Types.SET_GIF, gifUrl });
      dispatch({ type: Types.ADD_RESULT_DATA, answer });
    }
  };
}

const restartGame = () => ({
  type: Types.RESTART_GAME
});
export default {
  setName,
  setQuizType,
  fetchQuestions,
  questionAnswered,
  determineQuestionAnsweredCorrectly,
  setAnswerToFalse,
  resetGiphy,
  setQuestion,
  restartGame
};
