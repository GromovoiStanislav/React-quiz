import styles from './style.module.css';

const Button = ({ type, onClick, disabled, children }) => {
  const classes = [styles.Button, styles[type]];

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes.join(' ')}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
