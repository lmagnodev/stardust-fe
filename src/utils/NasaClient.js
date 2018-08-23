import axios from 'axios';
import { NASA_IMAGE_URL } from './constants';

export const NasaImageClient = {
  searchImage : (searchStr) => {
   axios.get(`${NASA_IMAGE_URL}/search?q=${encodeURIComponent(searchStr)}`)
   .then(function (response) {
     console.log(response);
   })
   .catch(function (error) {
     console.log(error);
   }); 
  }
};