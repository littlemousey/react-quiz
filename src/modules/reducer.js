import ACTIONS from "./action";

const defaultState = {
  namePlayer: "",
  quizType: "",
  questions: {
    error: null,
    loading: false,
    data: {}
  },
  currentQuestion: 0
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

    case ACTIONS.Types.CORRECT_ANSWER: {
      return {
        ...state,
        currentQuestion: action.questionIndex + 1,
        questions: {
          ...state.questions,
          data: {
            ...state.questions.data,
            [action.questionIndex]: {
              ...state.questions.data[action.questionIndex],
              isCorrect: true
            }
          }
        }
      };
    }

    case ACTIONS.Types.WRONG_ANSWER: {
      return {
        ...state,
        questions: {
          ...state.questions,
          data: {
            ...state.questions.data,
            [action.questionIndex]: {
              ...state.questions.data[action.questionIndex],
              isCorrect: false
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

    default:
      return state;
  }
};

export default quizReducer;
