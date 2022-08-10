import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { GoToButton } from "../common/buttons/GoToButton";


const RoomBox = styled.div`
  display: flex;
  background-color: white;
  width: 400px;
  height: 300px;
  border-radius: 30px;
`

const RoomListItem = ({
  roomId,
  roomName,
  peopleLimit,
  categoryId
}) => {

  const navigate = useNavigate();

  return (
    <RoomBox>
      <GoToButton onClick={() => navigate(`/rooms/${roomId}`, {roomId:roomId})} color={"cornflowerblue"}>방 디테일</GoToButton>
      <div>{roomId}</div>
      <div>{roomName}</div>
      <div>{peopleLimit}</div>
      <div>{categoryId}</div>
    </RoomBox>
  )
}

export default RoomListItem