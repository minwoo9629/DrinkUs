const initialState = {
  user: {
    isLogin: false,
    // 이름, 닉네임, 인기도
    profile: null,
    // profile: {
    //   name: "성유지",
    //   nickName: "ssafy",
    //   popularity: 10,
    // },
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        isLogin: true,
        profile: action.profile,
      };
    case "LOG_OUT":
      return {
        ...state,
        isLogin: false,
        profile: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
