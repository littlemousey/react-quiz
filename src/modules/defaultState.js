export const defaultState = {
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
