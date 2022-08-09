import { client } from "../utils/client";

const createRoom = async (data) =>{
  const result = await client.post("/rooms", data).then((response)=> response);
  return result;
}

export { createRoom };