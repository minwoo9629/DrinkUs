const initialState = {
  isLogin: false,
  data: null,
};

const userReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case "SET_USER_PROFILE":
      return {
        ...prevState,
        isLogin: true,
        data: { ...action.data },
      };
    case "LOG_OUT":
      return {
        ...prevState,
        isLogin: false,
        data: null,
      };
    default:
      return prevState;
  }
};

export default userReducer;
