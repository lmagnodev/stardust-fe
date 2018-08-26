import React, { Component } from 'react';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { NasaImageClient } from '../utils/NasaClient';

import { 
  searchHasErrored, 
  searchIsLoading, 
  searchDataSuccess 
} from '../redux/actions/search'

export class SearchNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: ''
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = () => {
    const failureCallback = () => {
      this.props.setLoading(false);
      this.props.setHasErrored(true);
    };

    const successCallback = (images) => {
      this.props.setLoading(false);
      this.props.setImages(images);
    };

    this.props.setLoading(true);
    NasaImageClient.searchImage(
      this.state.searchQuery, 
      successCallback, 
      failureCallback
    );
  };

  render() {
    return (
      <div className="search-nav" style={{ padding: 5 }}>
        <Grid container spacing={24}>
          <Grid item sm={8} xs={12}>
            <TextField 
              id="searchQuery"
              label="Search powered by NASA"
              className="search-box"
              value={ this.state.searchQuery }
              onChange={ this.handleChange('searchQuery') }
            />
          </Grid>
          <Grid item sm={4} xs={12}>
            <Button 
              onClick={ this.handleSubmit }
              variant="outlined" 
              color="primary"
              size="large"
              className="search-button">
              Search
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      images: state.images,
      hasErrored: state.searchHasErrored,
      isLoading: state.searchIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      setLoading: (loading) => dispatch(searchIsLoading(loading)),
      setHasErrored: (errored) => dispatch(searchHasErrored(errored)),
      setImages: (images) => dispatch(searchDataSuccess(images))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchNav);