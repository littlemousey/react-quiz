import ACTIONS from "./action";

const defaultState = {
  namePlayer: "",
  questions: []
};

const quizReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.ADD_QUESTION: {
      return { ...state, questions: [...state.questions, action.question] };
    }
    case ACTIONS.Types.CHANGE_NAME: {
      return { ...state, namePlayer: action.name };
    }

    default:
      return state;
  }
};

export default quizReducer;
