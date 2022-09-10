import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './style.module.css';
import Backdrop from '../../UI/Backdrop';
import { connect } from 'react-redux';

class Drawer extends Component {
  renderLinks(links) {
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

    const links = [{ to: '/', label: 'Список' }];
    if (this.props.isAuthenticated) {
      links.push({ to: '/quiz-creator', label: 'Создать тест' });
      links.push({ to: '/logout', label: 'Выйти' });
    } else {
      links.push({ to: '/auth', label: 'Авторизация' });
    }

    return (
      <>
        <nav className={classes.join(' ')}>
          <ul>{this.renderLinks(links)}</ul>
        </nav>
        {this.props.isOpen && <Backdrop onClick={this.props.onClose} />}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.token,
});

export default connect(mapStateToProps)(Drawer);
