import styles from './style.module.css';

const Select = ({ label, value, onChange, options }) => {
  return (
    <div className={styles.Select}>
      <label>
        {label}
        <select value={value} onChange={onChange}>
          {options.map((option, index) => {
            return (
              <option value={option.value} key={option.value + index}>
                {option.text}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
};
export default Select;
