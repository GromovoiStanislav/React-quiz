import styles from './style.module.css';

function isInvalidFn(valid, touched, shouldValidate) {
  return !valid && shouldValidate && touched;
}

const Input = ({
  type = 'text',
  label,
  value,
  onChange,
  errorMessage,
  valid,
  touched,
  shouldValidate,
}) => {
  const classes = [styles.Input];

  const isInvalid = isInvalidFn(valid, touched, shouldValidate);

  if (isInvalid) {
    classes.push(styles.invalid);
  }

  return (
    <div className={classes.join(' ')}>
      <label>
        {label}
        <input type={type} value={value} onChange={onChange} />
      </label>

      {isInvalid ? (
        <span>{errorMessage || 'Введите верное значение'}</span>
      ) : null}
    </div>
  );
};

export default Input;
