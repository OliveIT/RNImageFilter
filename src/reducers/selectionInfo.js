import { SET_URI } from "../actions/types";

const initialState = {
    uri: ""
};

export const selectionInfo = (state = initialState, action) => {
  switch (action.type) {
    case SET_URI:
      return {
        ...state,
        uri: action.payload,
      };
    default:
      return state;
  }
}
