import axios from 'axios';
import { NASA_IMAGE_URL } from './constants';

export const NasaImageClient = {
  searchImage : (searchStr, successCallback, failCallback) => {
   axios.get(`${NASA_IMAGE_URL}/search?q=${encodeURIComponent(searchStr)}`)
   .then(function (response) {
     console.log(response);
     successCallback(response);
   })
   .catch(function (error) {
     console.log(error);
     failCallback();
   }); 
  }
};