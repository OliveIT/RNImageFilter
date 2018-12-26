import { SET_URI } from "./types";


export const setUri = (uri) => {
    return {
        type: SET_URI,
        payload: uri
    };
}