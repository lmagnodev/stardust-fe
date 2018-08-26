import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import Pagination from './Pagination';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  singleImage: {
    width: 500,
    height: 'auto',
  }
});

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedImage: null
    };
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.isLoading) {
      return { selectedImage: null };
    }

    return null;
  }

  setSelectedImage = (index) => {
    return () => this.setState({selectedImage: index});
  }

  renderSingleImage = () => {
    const { classes, images } = this.props;
    const selectedImage = images[this.state.selectedImage];

    return (
      <div className={classes.root}>
        <div className={classes.singleImage}>
          <img src={selectedImage.thumbUrl} alt={selectedImage.title} className={classes.gridList}/>
          <div>
            <div onClick={ this.setSelectedImage(null) } align="center">[X] Close</div>
            <Typography variant="headline" gutterBottom>
              { selectedImage.title }
            </Typography>
            <Typography variant="caption" gutterBottom>
              { selectedImage.description }
            </Typography>
            
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { classes, images } = this.props;

    if (!images) {
      return null;
    }

    if (this.state.selectedImage !== null) {
      return this.renderSingleImage();
    }

    return (
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">Images for { this.props.searchStr} ({this.props.resultsCount} results)</ListSubheader>
          </GridListTile>
          {images.map((image, index) => (
            <GridListTile key={image.thumbUrl}>
              <img src={image.thumbUrl} alt={image.title} onClick={ this.setSelectedImage(index) }/>
              <GridListTileBar
                title={image.title}
                subtitle={<span>{image.description}</span>}
              />
            </GridListTile>
          ))}
        </GridList>
        <div className={classes.gridList}>
          <Pagination />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    images: state.images.imageCollection,
    isLoading: state.searchIsLoading,
    searchStr: state.images.searchStr,
    resultsCount: state.images.totalImages
  };
};

export default withStyles(styles)(connect(mapStateToProps)(SearchResults));
