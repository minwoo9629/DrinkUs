const initialState = {
  sessionName: null,
  roomId: null,
};

const roomReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case "SET_ROOM_SESSION":
      return {
        ...action.data,
      };
    case "CLEAR_ROOM_SESSION":
      console.log("세션 클리어");
      return {
        sessionName: null,
        roomId: null,
      };
    default:
      return prevState;
  }
};

export default roomReducer;
