import React, { Component } from 'react';
import styles from './style.module.css';
import ActiveQuiz from '../../components/ActiveQuiz';

class Quiz extends Component {
  state = {
    activQuestion: 0,
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
    console.log('answerId', answerId);
    this.setState({ activQuestion: this.state.activQuestion + 1 });
  };

  render() {
    const { activQuestion, quiz } = this.state;
    return (
      <div className={styles.Quiz}>
        <div className={styles.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          <ActiveQuiz
            question={quiz[activQuestion].question}
            answers={quiz[activQuestion].answers}
            quizLength={quiz.length}
            answerNumber={activQuestion + 1}
            onAnswerClick={this.onAnswerClickHandler}
          />
        </div>
      </div>
    );
  }
}

export default Quiz;
