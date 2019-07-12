import ACTIONS from "./action";

const defaultState = {
  questions: []
};

const quizReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.ADD_QUESTION: {
      console.log("action: ", action);
      return { ...state, questions: [...state.questions, action.question] };
    }

    default:
      return state;
  }
};

export default quizReducer;
