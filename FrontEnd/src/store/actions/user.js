import axios from "axios";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT,
} from "../types/user";

// async action creator
const logIn = (data) => {
  // async action
  return (dispatch, getState) => {
    // dispatch(logInRequest(data));
    axios
      .get("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => {
        // 토큰받고
        // 프로필 요청
        if (response.status === 200) {
          dispatch(logInSuccess(data));
        }
      })
      .catch((e) => dispatch(logInFailure(e)));
  };
};

// sync action creator

const logInRequest = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

const logInSuccess = (data) => {
  return {
    type: LOG_IN_SUCCESS,
    data,
  };
};

const logInFailure = (data) => {
  return {
    type: LOG_IN_FAILURE,
    data,
  };
};

const logOut = () => {
  return {
    type: LOG_OUT,
  };
};

export { logIn, logInRequest, logInSuccess, logInFailure, logOut };
