export default class ImageModel {
  constructor(
    title,
    description,
    keywords,
    imageCollectionUrl,
    thumbUrl
  ) {
    this.title = title;
    this.description = description;
    this.keywords = keywords;
    this.imageCollectionUrl = imageCollectionUrl;
    this.thumbUrl = thumbUrl;
  }
}