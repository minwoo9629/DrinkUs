const initialState = {
  isLogin: false,
  data: null,
};

const userReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case "LOG_IN_SUCCESS":
      return {
        ...prevState,
        isLogin: true,
        data: { ...action.data, nickName: "꼬부기" },
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
