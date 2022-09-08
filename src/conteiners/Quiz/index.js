import React, { Component } from 'react';
import styles from './style.module.css';
import ActiveQuiz from '../../components/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz';
import axios from 'axios';
import withRouter from '../../hoc/withRouter';

class Quiz extends Component {
  state = {
    results: {}, // { [id]: 'success' or 'error' }
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // { [id]: 'success' or 'error' }
    quiz: [
      {
        id: 1,
        question: 'Какого цвета небо?',
        answers: [
          { text: 'Чёрный', id: 1 },
          { text: 'Синий', id: 2 },
          { text: 'Красный', id: 3 },
          { text: 'Зеленый', id: 4 },
        ],
        rightAnswerId: 2,
      },
      {
        id: 2,
        question: 'В каком году основали Санкт-Петербург?',
        answers: [
          { text: '1700', id: 1 },
          { text: '1702', id: 2 },
          { text: '1703', id: 3 },
          { text: '1803', id: 4 },
        ],
        rightAnswerId: 3,
      },
      {
        id: 3,
        question: 'В каком году основали Москву?',
        answers: [
          { text: '1700', id: 1 },
          { text: '1702', id: 2 },
          { text: '1703', id: 3 },
          { text: '1803', id: 4 },
        ],
        rightAnswerId: 3,
      },
    ],
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
    // try {
    //   const response = await axios.get(
    //     'https://react-quiz-e85cc-default-rtdb.firebaseio.com/quizes.json'
    //   );

    //   const quizes = [];
    //   Object.keys(response.data).forEach((key, index) => {
    //     quizes.push({ id: key, name: `Тест №${index + 1}` });
    //   });

    //   this.setState({ quizes, loading: false });
    // } catch (error) {
    //   console.log(error);
    // }
    console.log(this.props.router.params.id);
  }

  render() {
    const { activeQuestion, quiz, results, answerState } = this.state;
    return (
      <div className={styles.Quiz}>
        <div className={styles.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {this.state.isFinished ? (
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
