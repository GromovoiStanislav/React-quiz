import styles from './style.module.css';

function isInvalidFn({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched;
}

const Input = ({
  type = 'text',
  label,
  value,
  onCange,
  errorMessage,
  validation = {},
}) => {
  const classes = [styles.Input];

  const isInvalid = isInvalidFn(validation);
  if (isInvalid) {
    classes.push(styles.invalid);
  }

  return (
    <div className={classes.join(' ')}>
      <label>
        {label}
        <input type={type} value={value} onCange={onCange} />
      </label>
      <span>{errorMessage}</span>

      {isInvalid ? (
        <span>{errorMessage || 'Введите верное значение'}</span>
      ) : null}
    </div>
  );
};

export default Input;
