import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { 
  searchDataFetch,
  searchIsLoading
} from '../redux/actions/search'

const MAX_PAGINATION_DISPLAY = 10;
const MAX_RESULTS_PER_PAGE = 100;

class Pagination extends Component {

  getStartPage() {
    let endPage = this.getEndPage();
    let startPage = endPage - MAX_PAGINATION_DISPLAY + 1;

    if (startPage <= 0) {
      return 1;
    }

    return startPage;
  }

  getEndPage() {
    const { page } = this.props.search;
    let endPage = page + (Math.ceil(MAX_PAGINATION_DISPLAY / 2) - 1);
    let totalPages = this.getTotalPages();
    
    if (endPage < MAX_PAGINATION_DISPLAY) {
      return MAX_PAGINATION_DISPLAY;
    }

    if (endPage > totalPages) {
      endPage = totalPages;
    }

    return endPage;
  }

  getTotalPages() {
    const totalImages  = this.props.resultsCount;
    
    return Math.ceil(totalImages / MAX_RESULTS_PER_PAGE);
  }

  goToPage = (page) => {
    return () => {
      const { setLoading, fetchImages } = this.props;
      const { searchStr, advancedSearch } = this.props.search;

      setLoading(true);
      fetchImages(searchStr, page, advancedSearch);
    }
  }
  
  getPages(startPage, endPage) {
    let pages = [];
    
    for(let i = startPage; i <= endPage; i++) {
      let pageClass = (i === this.props.search.page) ? 'page active' : 'page';
      pages.push(
        <div className={ pageClass } onClick={ this.goToPage(i) }>{ i }</div>
      );
    }

    return pages;
  }

  render() {
    if (!this.props.resultsCount) {
      return null;
    }

    return (
      <Grid container spacing={24}>
        <Grid item lg={4} md={3} xs={0}></Grid>
        <Grid item lg={4} md={6} xs={12}>
          <div className="pagination">
            { this.getPages(this.getStartPage(), this.getEndPage()) }
          </div>
        </Grid>
        <Grid item lg={4} md={3} xs={0} ></Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    resultsCount: state.images.totalImages,  
    search: state.search
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchImages: (searchStr, page, advancedSearch) => dispatch(searchDataFetch(searchStr, page, advancedSearch)),
    setLoading: (loading) => dispatch(searchIsLoading(loading))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
