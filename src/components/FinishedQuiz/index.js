import styles from './style.module.css';

const FinishedQuiz = () => {
  return (
    <div className={styles.FinishedQuiz}>
      <ul>
        <li>
          <strong>1.</strong>
          Finished
          <i className={'fa fa-times ' + styles.error} />
        </li>
        <li>
          <strong>2.</strong>
          Finished
          <i className={'fa fa-check ' + styles.success} />
        </li>
      </ul>
      <p>Правильно 4 из 10</p>
      <div>
        <button>Повторить</button>
      </div>
    </div>
  );
};

export default FinishedQuiz;
