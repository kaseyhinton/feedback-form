import { getAgencies } from './agencies.js';

export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_OFFLINE = 'UPDATE_OFFLINE';
export const UPDATE_ERROR = 'UPDATE_ERROR';
export const UPDATE_LOADING = 'UPDATE_LOADING';

export const navigate = (path) => (dispatch) => {
  // Extract the page name from path.
  const page = path === '/' ? 'view1' : path.slice(1);

  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage(page));
};

const loadPage = (page) => (dispatch, getState) => {
  switch(page) {
    case 'view1':
      import('../components/my-comment.js').then((module) => {
        if(getState().agencies.agencies.length < 1)
          dispatch(module.getAgencies());
      });
      break;
    default:
      page = 'view404';
      import('../components/my-view404.js');
  }

  dispatch(updatePage(page));
};

export const updateLoading = (isLoading) => {
  return {
    type: UPDATE_LOADING,
    isLoading
  };
};

const updatePage = (page) => {
  return {
    type: UPDATE_PAGE,
    page
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

export const updateLayout = (wide) => (dispatch, getState) => {
  console.log(`The window changed to a ${wide ? 'wide' : 'narrow'} layout`);
};
