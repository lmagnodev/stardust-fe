import { combineReducers } from 'redux';
import { 
  searchHasErrored, 
  searchIsLoading, 
  images,
  search
} from './search';
export default combineReducers({
  searchHasErrored,
  searchIsLoading,
  images,
  search
});