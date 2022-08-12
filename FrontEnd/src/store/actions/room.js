import { SET_ROOM_SESSION, CLEAR_ROOM_SESSION } from "../types/room";

const setRoomSession = (data) => {
  return {
    type: SET_ROOM_SESSION,
    data,
  };
};

const clearRoomSession = () => {
  return {
    type: CLEAR_ROOM_SESSION,
  };
};

export { setRoomSession, clearRoomSession };
