import { Types } from "./actionTypes";
import { defaultState } from "./defaultState";

const quizReducer = (state = defaultState, action) => {
  switch (action.type) {
    case Types.SET_NAME: {
      return {
        ...state,
        namePlayer: action.name
      };
    }
    case Types.FETCH_QUESTIONS_SUC: {
      return {
        ...state,
        questions: { loading: false, data: action.questions }
      };
    }
    case Types.FETCH_QUESTIONS_ERR: {
      return {
        ...state,
        questions: { loading: false, data: null, error: action.error }
      };
    }
    case Types.CHANGE_NAME: {
      return { ...state, namePlayer: action.name };
    }

    case Types.SET_GIF: {
      return { ...state, gifUrl: action.gifUrl };
    }

    case Types.ANSWER: {
      return {
        ...state,
        questions: {
          ...state.questions,
          data: {
            ...state.questions.data,
            [action.questionIndex]: {
              ...state.questions.data[action.questionIndex],
              answer: action.answer
            }
          }
        }
      };
    }

    case Types.SET_QUIZ_TYPE: {
      return {
        ...state,
        quizType: action.quizType
      };
    }

    case Types.QUESTION_ANSWERED: {
      return {
        ...state,
        questionHasBeenAnswered: action.questionHasBeenAnswered
      };
    }

    case Types.QUESTION_ANSWERED_CORRECTLY: {
      return {
        ...state,
        isAnswerCorrect: action.isAnswerCorrect
      };
    }

    case Types.SET_CURRENT_QUESTION: {
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1
      };
    }

    default:
      return state;
  }
};

export default quizReducer;
