import styled from "styled-components";
import { TimeGap } from "../../utils/TimeGap";
import { useNavigate } from "react-router-dom";

const RoomBox = styled.div`
  display: flex;
  background-color: white;
  width: 300px;
  height: 200px;
  border-radius: 30px;
  margin-right: 10px;
`

const RoomListItem = ({
  roomId,
  roomName,
  peopleLimit,
  categoryId,
  createdDate
}) => {

  const navigate = useNavigate();

  const timeGap = TimeGap(createdDate)

  return (
    <>
    <RoomBox
    onClick={() => navigate(`/rooms/${roomId}`)}
    >
      {timeGap}시간 전
      {roomId}
      {roomName}
      {peopleLimit}
      {categoryId}
    </RoomBox>
    </>
  )
}

export default RoomListItem