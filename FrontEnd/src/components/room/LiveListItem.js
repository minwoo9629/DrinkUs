import styled from "styled-components";
import { TimeGap } from "../../utils/TimeGap";
import { useNavigate } from "react-router-dom";

const RoomBox = styled.div`
  display: flex;
  background-color: white;
  width: 350px;
  height: 200px;
  border-radius: 30px;
  margin-right: 10px;
`

const LiveListItem = ({
  roomId,
  roomName,
  peopleLimit,
  placeTheme,
  createdDate,
}) => {

  const navigate = useNavigate();

  const timeGap = TimeGap(createdDate)

  return (
    <>
    <RoomBox 
    onClick={() => navigate(`/rooms/${roomId}`)}
    >
      <div>{roomId}</div>
      <div>{roomName}</div>
      <div>{peopleLimit}</div>
      <div>{placeTheme}</div>
      <div>{timeGap}시간 전</div>
    </RoomBox>
    </>
  )
}

export default LiveListItem