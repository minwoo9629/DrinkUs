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

const LiveListItem = ({
  roomId,
  roomName,
  peopleLimit,
  placeTheme,
  createdDate
}) => {

  const navigate = useNavigate();

  return (
    <RoomBox>
      <GoToButton onClick={() => navigate(`/rooms/${roomId}`, {roomId:roomId})} color={"cornflowerblue"}>방 디테일</GoToButton>
      <div>{roomId}</div>
      <div>{roomName}</div>
      <div>{peopleLimit}</div>
      <div>{placeTheme}</div>
      <div>{createdDate}</div>
    </RoomBox>
  )
}

export default LiveListItem