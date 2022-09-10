import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/Layout';
import Quiz from './conteiners/Quiz';
import Auth from './conteiners/Auth';
import QuizCreator from './conteiners/QuizCreator';
import QuizList from './conteiners/QuizList';

class App extends Component {
  render() {
    let routes = (
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/quiz-creator" element={<QuizCreator />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/" element={<QuizList />} />
      </Routes>
    );

    return <Layout>{routes}</Layout>;
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.token,
});

export default connect(mapStateToProps)(App);
