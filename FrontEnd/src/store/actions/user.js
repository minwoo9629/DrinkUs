import { SET_USER_PROFILE, LOG_OUT } from "../types/user";
import { client } from "../../api/client";

// async action creator
const getUserProfile = () => {
  // async action
  return (dispatch, getState) => {
    client.get("/users/test").then((response) => {
      dispatch(setUserProfile(response.data));
    });
  };
};

// sync action creator

const setUserProfile = (data) => {
  return {
    type: SET_USER_PROFILE,
    data,
  };
};

const logOut = () => {
  return {
    type: LOG_OUT,
  };
};

export { getUserProfile, setUserProfile, logOut };
