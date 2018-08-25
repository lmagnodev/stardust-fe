import { combineReducers } from 'redux';
import { searchHasErrored, searchIsLoading, images } from './search';
export default combineReducers({
  searchHasErrored,
  searchIsLoading,
  images
});