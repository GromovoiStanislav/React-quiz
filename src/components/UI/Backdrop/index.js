import styles from './style.module.css';

const Backdrop = ({ onClick }) => (
  <div className={styles.Backdrop} onClick={onClick} />
);

export default Backdrop;
