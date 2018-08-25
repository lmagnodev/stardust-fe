import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';
import SearchPage from './components/SearchPage';

import './scss/main.scss';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <SearchPage />
        </Provider>
      </div>
    );
  }
}

export default App;
