import { client } from "../utils/client";

const createRoom = async (data) => {
  const result = await client.post("/rooms", data).then((response) => response);
  return result;
};

const getRoomInfo = async (roomId) => {
  const result = await client
    .get(`/rooms/${roomId}`)
    .then((response) => response.data);
  return result;
};

export { createRoom, getRoomInfo };
