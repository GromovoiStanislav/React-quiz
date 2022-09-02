import React, { Component } from 'react';
import styles from './style.module.css';
import MenuToggle from '../../components/Navigation/MenuToggle';

class Layout extends Component {
  state = { isOpen: false };

  onToggleMenuHandler = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div className={styles.Layout}>
        <MenuToggle
          isOpen={this.state.isOpen}
          onToggle={this.onToggleMenuHandler}
        />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;
