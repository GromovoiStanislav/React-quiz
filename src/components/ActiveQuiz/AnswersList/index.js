import styles from './style.module.css';
import AnswerItem from './AnswerItem';

const AnswersList = ({ answers, state, onAnswerClick }) => (
  <ul className={styles.AnswersList}>
    {answers.map((answer, i) => (
      <AnswerItem
        key={i}
        answer={answer}
        state={state ? state[answer.id] : null}
        onAnswerClick={onAnswerClick}
      />
    ))}
  </ul>
);

export default AnswersList;
