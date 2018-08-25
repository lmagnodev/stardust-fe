import { 
  SEARCH_HAS_ERRORED,
  SEARCH_IS_LOADING,
  SEARCH_DATA_SUCCESS
} from '../constants';

export function searchHasErrored(bool) {
  return {
      type: SEARCH_HAS_ERRORED,
      hasErrored: bool
  };
}
export function searchIsLoading(bool) {
  return {
      type: SEARCH_IS_LOADING,
      isLoading: bool
  };
}
export function searchDataSuccess(images) {
  return {
      type: SEARCH_DATA_SUCCESS,
      images
  };
}