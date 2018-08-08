export const GET_AGENCIES = 'GET_AGENCIES';
export const RECEIVE_AGENCIES = 'RECEIVE_AGENCIES';

export const getAgencies = () => (dispatch) => {
  dispatch(recieveAgencies([{
    AgencyName: 'Leavitt Software Solutions',
    id: 1
  },{
    AgencyName: 'Friendly Neighborhood Insurance',
    id: 2
  },{
    AgencyName: 'Text Book Solutions',
    id: 3
  }]));
};


export const recieveAgencies = (agencies) => {
  return {
    type: RECEIVE_AGENCIES,
    agencies
  }
}