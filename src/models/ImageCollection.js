import ImageModel from './ImageModel';

export default class ImageCollection {

  constructor(searchStr, unformattedData) {
    this.imageCollection = [];
    this.totalImages = 0;
    this.searchStr =  searchStr;
    
    if (
      unformattedData.data && 
      unformattedData.data.collection &&
      unformattedData.data.collection.items &&
      unformattedData.data.collection.metadata &&
      unformattedData.data.collection.metadata.total_hits
    ) {
      const collection = unformattedData.data.collection.items;
      collection.forEach((image) => {
        let imageModel = new ImageModel(
          image.data[0].title, 
          image.data[0].description,
          image.data[0].keywords,
          image.href,
          image.links[0].href
        );

        this.imageCollection.push(imageModel);
      });

      this.totalImages = unformattedData.data.collection.metadata.total_hits;
    }
  }
}