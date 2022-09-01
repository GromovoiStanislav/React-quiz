import React, { Component } from 'react';
import Layout from './hoc/Layout';
import Quiz from './conteiners/Quiz';

class App extends Component {
  render() {
    return (
      <Layout>
        <Quiz />
      </Layout>
    );
  }
}

export default App;
