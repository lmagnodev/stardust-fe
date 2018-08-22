import React, { Component } from 'react';
import Header from './Header1';
import SearchNav from './SearchNav1';


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
