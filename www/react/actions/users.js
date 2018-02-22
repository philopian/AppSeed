import axios from "axios";
import {
  GET_ALL_USERS,
  SET_ALL_USERS,
  GET_ALL_USERS_ERROR
} from "../actions/action-types";

import config from "../../../appseed.config";
const BASE_URL = config.baseUrl;

export const requestUsers = () => ({
  type: GET_ALL_USERS
});

export const receiveUsers = payload => ({
  type: SET_ALL_USERS,
  payload
});

export const requestUsersError = () => ({
  type: GET_ALL_USERS_ERROR
});

// Action creator return a dispatch function - thunk
export const fetchAllUsers = () => dispatch => {
  dispatch(requestUsers());
  const URL = `${BASE_URL}/users`;

  /*
  // Using the bakedin nodejs way
  return fetch(URL)
    .then(response => response.json())
    .then(json => {
      dispatch(receiveUsers(json));
    });
  //*/

  // Axios way
  return axios.get(URL).then(response => {
    if (response.status === 200) {
      dispatch(receiveUsers(response.data));
    } else {
      dispatch(requestUsersError());
    }
  });
};
