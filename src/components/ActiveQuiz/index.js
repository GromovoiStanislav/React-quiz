import styles from './style.module.css';
import AnswersList from './AnswersList';

const ActiveQuiz = ({
  question,
  answers,
  answerNumber,
  state,
  quizLength,
  onAnswerClick,
}) => (
  <div className={styles.ActiveQuiz}>
    <p className={styles.Question}>
      <span>
        <strong>{answerNumber}.&nbsp;</strong>
        {question}
      </span>
      <small>
        {answerNumber} из {quizLength}
      </small>
    </p>
    <AnswersList
      state={state}
      answers={answers}
      onAnswerClick={onAnswerClick}
    />
  </div>
);

export default ActiveQuiz;
