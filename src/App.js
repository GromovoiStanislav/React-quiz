import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/Layout';
import Quiz from './conteiners/Quiz';
import Auth from './conteiners/Auth';
import QuizCreator from './conteiners/QuizCreator';
import QuizList from './conteiners/QuizList';
import Logout from './components/Logout';
import { autoLogin } from './store/actions/auth';

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    let routes = (
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/" element={<QuizList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Routes>
          <Route path="/quiz-creator" element={<QuizCreator />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/" element={<QuizList />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      );
    }

    return <Layout>{routes}</Layout>;
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
  autoLogin: () => dispatch(autoLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
