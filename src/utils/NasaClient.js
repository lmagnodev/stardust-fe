import axios from 'axios';
import { NASA_IMAGE_URL } from './constants';
import ImageCollection from '../models/ImageCollection';

export const NasaImageClient = {
  searchImage : (searchStr, successCallback, failCallback, page = 1) => {
    if (!searchStr) {
      failCallback();
      return null;
    }

    axios.get(`${NASA_IMAGE_URL}/search?q=${encodeURIComponent(searchStr)}&page=${page}`)
    .then(function (response) {
      const imageCollection = new ImageCollection(searchStr, response);
      successCallback(imageCollection);
    })
    .catch(function (error) {
      failCallback();
    }); 
  }
};