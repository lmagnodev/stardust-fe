import React, { Component } from 'react';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { NasaImageClient } from '../utils/NasaClient';

import { 
  searchHasErrored, 
  searchIsLoading, 
  searchDataSuccess,
  searchDataFetch
} from '../redux/actions/search'

export class SearchNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      page: 1,
      advancedSearchEnabled: false,
      center: '',
      description: '',
      keywords: '',
      location: '',
      photographer: '',
      title: '',
      yearStart: '',
      yearEnd: ''
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if(props.isLoading) {
      const failureCallback = () => {
        props.setLoading(false);
        props.setHasErrored(true);
      };
  
      const successCallback = (images) => {
        props.setLoading(false);
        props.setImages(images);
      };

      NasaImageClient.searchImage(
        props.search.searchStr, 
        successCallback, 
        failureCallback,
        props.search.page
      );
    }

    return null;
  }

  handleSubmit = () => {
    this.props.setLoading(true);
    this.props.fetchImages(this.state.searchQuery, this.state.page);
  }

  renderAdvancedSearch() {
    return (
      <div style={{ paddingTop: 20 }}>
        <Typography variant="subheading" align="left" color="primary">
          Advanced Search
        </Typography>
        <Grid container spacing={24}>
          <Grid item sm={8} xs={12}>
          <TextField 
            id="center"
            label="NASA center"
            className="search-box"
            value={ this.state.center }
            onChange={ this.handleChange('center') }
          />
          <TextField 
            id="description"
            label="Description"
            className="search-box"
            value={ this.state.description }
            onChange={ this.handleChange('description') }
          />
          <TextField 
            id="location"
            label="Location"
            className="search-box"
            value={ this.state.location }
            onChange={ this.handleChange('location') }
          />
          <TextField 
            id="photographer"
            label="Photographer"
            className="search-box"
            value={ this.state.photographer }
            onChange={ this.handleChange('photographer') }
          />
          <TextField 
            id="title"
            label="Title"
            className="search-box"
            value={ this.state.title }
            onChange={ this.handleChange('title') }
          />
          <TextField 
            id="yearStart"
            label="From Year"
            className="search-box"
            value={ this.state.yearStart }
            onChange={ this.handleChange('yearStart') }
          />
          <TextField 
            id="yearEnd"
            label="To Year"
            className="search-box"
            value={ this.state.yearEnd }
            onChange={ this.handleChange('yearEnd') }
          />
          <Typography variant="caption" align="left" className="linkLook" style={{ paddingTop: 20 }}>
            <div onClick={ this.toggleAdvancedSearch }>[X] Close</div>
          </Typography>
          </Grid>
          <Grid item sm={4} xs={12}>
            
          </Grid>
        </Grid>
      </div>
    );
  }

  toggleAdvancedSearch = () => {
    this.setState({ advancedSearchEnabled : !this.state.advancedSearchEnabled });
  };

  renderAdvancedSearchLink() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Typography variant="caption" gutterBottom align="left" className="linkLook">
            <div onClick={ this.toggleAdvancedSearch }>Advanced Search</div>
          </Typography>
        </Grid>
      </Grid>
    );
  }
  
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
        {
          this.state.advancedSearchEnabled ? this.renderAdvancedSearch() : this.renderAdvancedSearchLink()
        }  
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    images: state.images,
    hasErrored: state.searchHasErrored,
    isLoading: state.searchIsLoading,
    search: state.search
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: (loading) => dispatch(searchIsLoading(loading)),
    setHasErrored: (errored) => dispatch(searchHasErrored(errored)),
    setImages: (images) => dispatch(searchDataSuccess(images)),
    fetchImages: (searchStr, page) => dispatch(searchDataFetch(searchStr, page))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchNav);