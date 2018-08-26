import React, { Component } from 'react';
import { connect } from 'react-redux';


class Pagination extends Component {
  
  render() {
    
    return (
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">Images for { this.props.searchStr} ({this.props.resultsCount} results)</ListSubheader>
          </GridListTile>
          {images.map(image => (
            <GridListTile key={image.thumbUrl}>
              <img src={image.thumbUrl} alt={image.title} />
              <GridListTileBar
                title={image.title}
                subtitle={<span>by: {image.title}</span>}
              />
            </GridListTile>
          ))}
        </GridList>
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

export default connect(mapStateToProps)(SearchResults);
