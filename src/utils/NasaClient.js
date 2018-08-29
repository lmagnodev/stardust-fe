import axios from 'axios';
import { NASA_IMAGE_URL } from './constants';
import ImageCollection from '../models/ImageCollection';

const getAdvancedSearch =(advancedSearch) => {
  const searchParams = [];

  Object.keys(advancedSearch).forEach((key) => {
    if (advancedSearch[key]) {
      switch(key) {
        case 'yearStart':
          searchParams.push(`year_start=${encodeURIComponent(advancedSearch[key])}`);
        case 'yearEnd':
          searchParams.push(`year_end=${encodeURIComponent(advancedSearch[key])}`);
          break;
        default:
          searchParams.push(`${key}=${encodeURIComponent(advancedSearch[key])}`);
      }
    }
  });
  
  return searchParams.join('&');
};

export const NasaImageClient = {
  

  searchImage : (searchStr, successCallback, failCallback, page = 1, advancedSearch = {}) => {
    if (!searchStr) {
      failCallback();
      return null;
    }

    let query = `q=${encodeURIComponent(searchStr)}&page=${page}`;
    const advancedSearchQuery = getAdvancedSearch(advancedSearch);
    if (advancedSearch) {
      query += `&${advancedSearchQuery}`;
    }
    axios.get(`${NASA_IMAGE_URL}/search?${query}`)
    .then(function (response) {
      const imageCollection = new ImageCollection(searchStr, response);
      successCallback(imageCollection);
    })
    .catch(function (error) {
      failCallback();
    }); 
  }
};