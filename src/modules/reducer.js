import ACTIONS from "./action";

const defaultState = {
  questions: []
};

const quizReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.ADD_QUESTION: {
      return [...state, action.payload];
    }

    default:
      return state;
  }
};

export default quizReducer;
