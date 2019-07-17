import ACTIONS from "./action";

const defaultState = {
  namePlayer: "",
  quizType: "",
  questions: {
    error: null,
    loading: false,
    data: {}
  },
  currentQuestion: 0,
  gifUrl: "",
  questionHasBeenAnswered: false,
  isAnswerCorrect: false
};

const quizReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.SET_NAME: {
      return {
        ...state,
        namePlayer: action.name
      };
    }
    case ACTIONS.Types.FETCH_QUESTIONS_SUC: {
      return {
        ...state,
        questions: { loading: false, data: action.questions }
      };
    }
    case ACTIONS.Types.FETCH_QUESTIONS_ERR: {
      return {
        ...state,
        questions: { loading: false, data: null, error: action.error }
      };
    }
    case ACTIONS.Types.CHANGE_NAME: {
      return { ...state, namePlayer: action.name };
    }

    case ACTIONS.Types.SET_GIF: {
      return { ...state, gifUrl: action.gifUrl };
    }

    case ACTIONS.Types.ANSWER: {
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

    case ACTIONS.Types.SET_QUIZ_TYPE: {
      return {
        ...state,
        quizType: action.quizType
      };
    }

    case ACTIONS.Types.QUESTION_ANSWERED: {
      return {
        ...state,
        questionHasBeenAnswered: action.questionHasBeenAnswered
      };
    }

    case ACTIONS.Types.QUESTION_ANSWERED_CORRECTLY: {
      return {
        ...state,
        isAnswerCorrect: action.isAnswerCorrect
      };
    }

    default:
      return state;
  }
};

export default quizReducer;
