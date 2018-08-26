import React, { Component } from 'react';
import Header from './Header';
import SearchNav from './SearchNav';
import SearchResults from './SearchResults';


class SearchPage extends Component {
  render() {
    return (
     <div className="main">
      <Header />
      <SearchNav />
      <SearchResults />
    </div>
    );
  }
}

export default SearchPage;
