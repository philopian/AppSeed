import * as types from "../../constants/action-types";

// eslint-disable-next-line
export function addComment(payload) {
  return {
    type: types.ADD_COMMENT,
    payload
  };
}