import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
  searchDataFetch
} from '../redux/actions/search'

class Pagination extends Component {
  
  render() {
    
    return (
      <div>
        Pagination here
      </div>
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
    fetchImages: (searchStr, page) => dispatch(searchDataFetch(searchStr, page))
  };
};

export default connect(mapStateToProps)(Pagination);
