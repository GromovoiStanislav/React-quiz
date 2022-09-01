import styles from './style.module.css';
import AnswerItem from './AnswerItem';

const AnswersList = ({ answers, onAnswerClick }) => (
  <ul className={styles.AnswersList}>
    {answers.map((answer, i) => (
      <AnswerItem key={i} answer={answer} onAnswerClick={onAnswerClick} />
    ))}
  </ul>
);

export default AnswersList;
