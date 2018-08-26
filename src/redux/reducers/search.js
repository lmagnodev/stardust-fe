import { 
  SEARCH_HAS_ERRORED,
  SEARCH_IS_LOADING,
  SEARCH_DATA_SUCCESS,
  SEARCH_DATA_FETCH
} from '../constants';

export function searchHasErrored(state = false, action) {
  switch (action.type) {
    case SEARCH_HAS_ERRORED:
      return action.hasErrored;
    default:
      return state;
  }
}
export function searchIsLoading(state = false, action) {
  switch (action.type) {
    case SEARCH_IS_LOADING:
      return action.isLoading;
    default:
      return state;
  }
}
export function images(state = [], action) {
  switch (action.type) {
    case SEARCH_DATA_SUCCESS:
      return action.images;
    default:
      return state;
  }
}

export function search(state = [], action) {
  switch (action.type) {
    case SEARCH_DATA_FETCH:
      return action.searchStr;
    default:
      return state;
  }
}