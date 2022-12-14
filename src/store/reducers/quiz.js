import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES_ERROR,
  QUIZ_SET_STATE,
  QUIZ_FINISH,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
} from '../actions/actionTypes';

const initialState = {
  quizes: [],
  loading: false,
  error: null,

  results: {}, // { [id]: 'success' or 'error' }
  isFinished: false,
  activeQuestion: 0,
  answerState: null, // { [id]: 'success' or 'error' }
  quiz: [], // []
};

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state,
        loading: true,
      };

    case FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        loading: false,
        quizes: action.quizes,
      };

    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        quiz: action.quiz,
      };

    case FETCH_QUIZES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results,
      };

    case QUIZ_FINISH:
      return {
        ...state,
        isFinished: true,
      };

    case QUIZ_NEXT_QUESTION:
      return {
        ...state,
        activeQuestion: action.questionNumber,
        answerState: null,
      };

    case QUIZ_RETRY:
      return {
        ...state,
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        results: {},
      };

    default:
      return state;
  }
}
