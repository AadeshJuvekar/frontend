import { GET_DEVELOPER, GET_TASK, GET_TASKS } from "../actions/types";

const initialState = {
  tasks: [],
  task: {},
  developer:{}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case GET_TASK:
      return {
        ...state,
        task: action.payload,
      };
      case GET_DEVELOPER:
      return {
        ...state,
        developer: action.payload,
      };
    default:
      return state;
  }
}
