import styles from './style.module.css';
import Button from '../UI/Button';

const FinishedQuiz = ({ quiz, results, onRetry }) => {
  let successCount = Object.keys(results).reduce((total, key) => {
    if (results[key] === 'success') {
      total++;
    }
    return total;
  }, 0);
  return (
    <div className={styles.FinishedQuiz}>
      <ul>
        {quiz.map((quizItem, index) => {
          const classes = [
            'fa',
            results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
            styles[results[quizItem.id]],
          ];

          return (
            <li key={index}>
              <strong>{index + 1}</strong>.&nbsp;
              {quizItem.question}
              <i className={classes.join(' ')} />
            </li>
          );
        })}
      </ul>
      <p>
        Правильно {successCount} из {quiz.length}
      </p>
      <div>
        <Button type={'primary'} onClick={onRetry}>
          Повторить
        </Button>
        <Button type={'success'}>Перейти в список тестов</Button>
      </div>
    </div>
  );
};

export default FinishedQuiz;
