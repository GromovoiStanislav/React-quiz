import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/auth';

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
  }
  render() {
    return <Navigate to={'/'} replace />;
  }
}

const mapDispatchToProps = (dispatch) => ({ logout: () => dispatch(logout()) });

export default connect(null, mapDispatchToProps)(Logout);
