import styles from './style.module.css';

const MenuToggle = ({ isOpen, onToggle }) => {
  const classes = [styles.MenuToggle, 'fa'];

  if (isOpen) {
    classes.push('fa-times');
    classes.push(styles.open);
  } else {
    classes.push('fa-bars');
  }

  return <i className={classes.join(' ')} onClick={onToggle} />;
};

export default MenuToggle;
