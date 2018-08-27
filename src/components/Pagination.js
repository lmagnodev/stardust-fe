import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { 
  searchDataFetch,
  searchIsLoading
} from '../redux/actions/search'

const MAX_PAGINATION_DISPLAY = 10;
const MAX_COUNT_PER_PAGE = 100;

class Pagination extends Component {

  getStartPage() {
    const { search } = this.props;

    if (search.page > MAX_PAGINATION_DISPLAY) {
      return search.page - MAX_PAGINATION_DISPLAY;
    }

    return 1;
  }

  getTotalPages() {
    const { totalImages } = this.props.resultsCount;
    
    return Math.ceil(totalImages / MAX_COUNT_PER_PAGE);
  }

  getEndPage() {
    let endPage = this.getStartPage() + MAX_PAGINATION_DISPLAY;
    let totalPages = this.getTotalPages();

    if (endPage > totalPages) {
      return totalPages;
    }

    return endPage;
  }

  goToPage = (page) => {
    return () => {
      this.props.setLoading(true);
      this.props.fetchImages(this.props.search.searchStr, page);
    }
  }
  
  getPages(startPage, endPage) {
    let pages = [];
    
    for(let i = startPage; i < endPage; i++) {
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
    fetchImages: (searchStr, page) => dispatch(searchDataFetch(searchStr, page)),
    setLoading: (loading) => dispatch(searchIsLoading(loading))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
