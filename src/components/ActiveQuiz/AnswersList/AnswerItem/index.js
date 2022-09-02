import styles from './style.module.css';

const AnswerItem = ({ answer, state, onAnswerClick }) => {
  const classes = [styles.AnswerItem];
  if (state) {
    classes.push(styles[state]);
  }

  return (
    <li className={classes.join(' ')} onClick={() => onAnswerClick(answer.id)}>
      {answer.text}
    </li>
  );
};

export default AnswerItem;
