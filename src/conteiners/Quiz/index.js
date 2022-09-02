import React, { Component } from 'react';
import styles from './style.module.css';
import ActiveQuiz from '../../components/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz';

class Quiz extends Component {
  state = {
    isFinished: false,
    activQuestion: 0,
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
    ],
  };

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === 'success') {
        return;
      }
    }

    const question = this.state.quiz[this.state.activQuestion];

    if (question.rightAnswerId === answerId) {
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
            activQuestion: this.state.activQuestion + 1,
            answerState: null,
          });
        }
        clearTimeout(timeout);
      }, 1000);
    } else {
      this.setState({
        answerState: { [answerId]: 'error' },
      });
    }
  };

  isQuizFinished() {
    return this.state.activQuestion + 1 === this.state.quiz.length;
  }

  render() {
    const { activQuestion, quiz } = this.state;
    return (
      <div className={styles.Quiz}>
        <div className={styles.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {this.state.isFinished ? (
            <FinishedQuiz />
          ) : (
            <ActiveQuiz
              question={quiz[activQuestion].question}
              answers={quiz[activQuestion].answers}
              quizLength={quiz.length}
              answerNumber={activQuestion + 1}
              state={this.state.answerState}
              onAnswerClick={this.onAnswerClickHandler}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Quiz;
