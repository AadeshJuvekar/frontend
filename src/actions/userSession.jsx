import axios from "axios";
import { GET_ERRORS, GET_SESSION } from "./types";

export const getSession = () => async (dispatch) => {
  const res = await axios.get("/api/getSession");
  console.log("res :"+ res.data);
  dispatch({
    type: GET_SESSION,
    payload: res.data,
    
  });
};

export const userLogin = (userDetail, history) => async (dispatch) => {
  try {
    await axios.post("/api/login", userDetail);
    window.location.replace("/");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const destroySession = () => async () => {
  await axios.get("/api/logout");
  window.location.replace("/");
};
