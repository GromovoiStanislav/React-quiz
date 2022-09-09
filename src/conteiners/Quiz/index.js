import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './style.module.css';
import ActiveQuiz from '../../components/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz';
import withRouter from '../../hoc/withRouter';
import Loader from '../../components/UI/Loader';
import { fetchQuizById } from '../../store/actions/quiz';

class Quiz extends Component {
  onRetryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {},
    });
  };

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === 'success') {
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        this.setState({
          results: { ...results, [question.id]: 'success' },
        });
      }

      this.setState({
        answerState: { [answerId]: 'success' },
      });

      const timeout = setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true,
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          });
        }
        clearTimeout(timeout);
      }, 500);
    } else {
      this.setState({
        answerState: { [answerId]: 'error' },
        results: { ...results, [question.id]: 'error' },
      });
    }
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  componentDidMount() {
    this.props.fetchQuizById(this.props.router.params.id);
  }

  render() {
    const { activeQuestion, quiz, results, answerState, loading, isFinished } =
      this.props;
    return (
      <div className={styles.Quiz}>
        <div className={styles.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          {loading || quiz.length == 0 ? (
            <Loader />
          ) : isFinished ? (
            <FinishedQuiz
              results={results}
              quiz={quiz}
              onRetry={this.onRetryHandler}
            />
          ) : (
            <ActiveQuiz
              question={quiz[activeQuestion].question}
              answers={quiz[activeQuestion].answers}
              quizLength={quiz.length}
              answerNumber={activeQuestion + 1}
              state={answerState}
              onAnswerClick={this.onAnswerClickHandler}
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
  fetchQuizById: (id) => dispatch(fetchQuizById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Quiz));
