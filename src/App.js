import React, { Component } from 'react';
import SearchPage from './components/SearchPage';

import './scss/main.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchPage />
      </div>
    );
  }
}

export default App;
