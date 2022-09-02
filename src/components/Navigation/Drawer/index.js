import React, { Component } from 'react';
import styles from './style.module.css';

const links = [1, 2, 3];

class Drawer extends Component {
  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <a>Link {link}</a>
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
      <nav className={classes.join(' ')}>
        <ul>{this.renderLinks()}</ul>
      </nav>
    );
  }
}

export default Drawer;