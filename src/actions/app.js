export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_OFFLINE = 'UPDATE_OFFLINE';
export const UPDATE_ERROR = 'UPDATE_ERROR';
export const UPDATE_LOADING = 'UPDATE_LOADING';

export const updateLoading = (isLoading) => {
  return {
    type: UPDATE_LOADING,
    isLoading
  };
};

export const updateError = (error) => {
  return {
    type: UPDATE_ERROR,
    error
  }
}

export const updateOffline = (offline) => (dispatch, getState) => {
  dispatch({
    type: UPDATE_OFFLINE,
    offline
  });
};
