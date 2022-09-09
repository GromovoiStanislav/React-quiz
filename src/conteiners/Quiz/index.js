import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './style.module.css';
import ActiveQuiz from '../../components/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz';
import withRouter from '../../hoc/withRouter';
import Loader from '../../components/UI/Loader';
import {
  fetchQuizById,
  quizAnswerClick,
  retryQuiz,
} from '../../store/actions/quiz';

class Quiz extends Component {
  componentDidMount() {
    this.props.fetchQuizById(this.props.router.params.id);
  }

  componentWillUnmount() {
    this.props.retryQuiz();
  }

  render() {
    const {
      activeQuestion,
      quiz,
      results,
      answerState,
      loading,
      isFinished,
      quizAnswerClick,
      retryQuiz,
    } = this.props;

    return (
      <div className={styles.Quiz}>
        <div className={styles.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          {loading || quiz.length === 0 ? (
            <Loader />
          ) : isFinished ? (
            <FinishedQuiz results={results} quiz={quiz} onRetry={retryQuiz} />
          ) : (
            <ActiveQuiz
              question={quiz[activeQuestion].question}
              answers={quiz[activeQuestion].answers}
              quizLength={quiz.length}
              answerNumber={activeQuestion + 1}
              state={answerState}
              onAnswerClick={quizAnswerClick}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.quiz.loading,
  results: state.quiz.results,
  isFinished: state.quiz.isFinished,
  activeQuestion: state.quiz.activeQuestion,
  answerState: state.quiz.answerState,
  quiz: state.quiz.quiz,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuizById: (quizId) => dispatch(fetchQuizById(quizId)),
  quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
  retryQuiz: () => dispatch(retryQuiz()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Quiz));
