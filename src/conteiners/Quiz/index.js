import React, { Component } from 'react';
import styles from './style.module.css';
import ActiveQuiz from '../../components/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz';
import axios from '../../axios/axios-quiz';
import withRouter from '../../hoc/withRouter';
import Loader from '../../components/UI/Loader';

class Quiz extends Component {
  state = {
    results: {}, // { [id]: 'success' or 'error' }
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // { [id]: 'success' or 'error' }
    quiz: [],
    loading: true,
  };

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

  async componentDidMount() {
    try {
      const response = await axios.get(
        `/quizes/${this.props.router.params.id}.json`
      );
      const quiz = response.data;

      this.setState({ quiz, loading: false });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { activeQuestion, quiz, results, answerState, loading } = this.state;
    return (
      <div className={styles.Quiz}>
        <div className={styles.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          {loading ? (
            <Loader />
          ) : this.state.isFinished ? (
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

export default withRouter(Quiz);
