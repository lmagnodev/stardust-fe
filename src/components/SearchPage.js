import React, { Component } from 'react';
import Header from './Header';
import SearchNav from './SearchNav';
import SearchResults from './SearchResults';
import Pagination from './Pagination';

class SearchPage extends Component {
  render() {
    return (
     <div className="main">
      <Header />
      <SearchNav />
      <SearchResults />
      <Pagination />
    </div>
    );
  }
}

export default SearchPage;
