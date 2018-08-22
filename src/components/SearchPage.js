import React, { Component } from 'react';
import Header from './Header';
import SearchNav from './SearchNav';


class SearchPage extends Component {
  render() {
    return (
     <div className="main">
      <Header />
      <SearchNav />
    </div>
    );
  }
}

export default SearchPage;
