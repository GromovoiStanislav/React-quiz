import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './style.module.css';
import axios from 'axios';

class QuizList extends Component {
  renderQuizes() {
    return [1, 2, 3].map((quiz, index) => {
      return (
        <li key={index}>
          <NavLink to={'/quiz/' + quiz}>Тест {quiz}</NavLink>
        </li>
      );
    });
  }

  componentDidMount() {
    axios
      .get('https://react-quiz-e85cc-default-rtdb.firebaseio.com/quiz.json')
      .then((response) => {
        console.log(response);
      });
  }

  render() {
    return (
      <div className={styles.QuizList}>
        <div>
          <h1>Список тестов</h1>
          <ul>{this.renderQuizes()}</ul>
        </div>
      </div>
    );
  }
}

export default QuizList;
