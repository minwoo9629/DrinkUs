import { SET_USER_PROFILE, LOG_OUT } from "../types/user";
import { getProfile } from "../../api/AuthAPI";

// async action creator
const getUserProfile = () => {
  // async action
  return (dispatch, getState) => {
    const response = getProfile();
    dispatch(setUserProfile(response.data));
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
