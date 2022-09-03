import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './style.module.css';
import Backdrop from '../../UI/Backdrop';

const links = [
  { to: '/', label: 'Список' },
  { to: '/auth', label: 'Авторизация' },
  { to: '/quiz-creator', label: 'Создать тест' },
];

class Drawer extends Component {
  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            className={({ isActive }) => (isActive ? styles.active : undefined)}
            onClick={this.props.onClose}
          >
            {link.label}
          </NavLink>
        </li>
      );
    });
  }

  render() {
    const classes = [styles.Drawer];

    if (!this.props.isOpen) {
      classes.push(styles.close);
    }

    return (
      <>
        <nav className={classes.join(' ')}>
          <ul>{this.renderLinks()}</ul>
        </nav>
        {this.props.isOpen && <Backdrop onClick={this.props.onClose} />}
      </>
    );
  }
}

export default Drawer;
