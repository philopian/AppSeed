import { SOME_ACTION, SET_SAMPLE_DATA } from "../../actions/types";

const initialState = {
  message: "hello redux!",
  sampleData: {}
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SOME_ACTION:
      return { ...state, message: action.payload };
    case SET_SAMPLE_DATA:
      return { ...state, sampleData: action.payload };

    default:
      return state;
  }
};
