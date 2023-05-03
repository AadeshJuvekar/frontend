import { GET_CLIENTS } from "../actions/types";

const initialState = {
  clients: [],
  client: {},
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CLIENTS:
      return {
        ...state,
        clients: action.payload,
      };
    default:
      return state;
  }
}
