import {
  SOME_ACTION,
  GET_SAMPLE_DATA,
  SET_SAMPLE_DATA,
  GET_SAMPLE_DATA_ERROR
} from "./types";
import axios from "axios";

import config from "../../../appseed.config";

/*********************************************************
 * Simple action example
 **********************************************************/
export const someActionToPerform = newData => {
  return dispatch => {
    dispatch({
      type: SOME_ACTION,
      payload: newData
    });
  };
};

/*********************************************************
 * Simple example of requesting data from a REST service
 **********************************************************/

export const requestData = () => ({
  type: GET_SAMPLE_DATA
});

export const receivedData = payload => ({
  type: SET_SAMPLE_DATA,
  payload
});

export const requestError = () => ({
  type: GET_SAMPLE_DATA_ERROR
});

export const fetchSampleData = gid => (dispatch, getState) => {
  const URL = `${config.BASE_URL}/api/test`;
  dispatch(requestData());
  return axios.get(URL).then(response => {
    if (response.status === 200 && response.data) {
      dispatch(receivedData(response.data));
    } else {
      dispatch(requestError());
      dispatch(receivedData(null));
    }
  });
};
