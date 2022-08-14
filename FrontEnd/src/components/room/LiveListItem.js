import styled from "styled-components";
import { TimeGap } from "../../utils/TimeGap";
import { useNavigate } from "react-router-dom";

const RoomBox = styled.div`
  padding: 10px 20px 20px 10px;
  flex-direction: row;
  background-color: white;
  width: 300px;
  height: 188px;
  border-radius: 30px;
  margin-right: 10px;
  box-shadow: inset 0px 0px 4px 4px #BDCFF2;
`

const ImageWrapper = styled.img`
  margin: 0px 0px 0px 4px;
  background-color: gray;
  width: 300px;
  height: 140px;
  border-radius: 30px;
`

const InfoWrapper = styled.div`
  margin: 4px 8px 4px 16px;
  justify-content: space-between;
  display: flex;
`

const InfoInnerWrapper = styled.div`
  height: 20px;
  font-size: 16px;
`

const TimeBox = styled.div`
  margin-left: 16px;
  color: gray;
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
    <RoomBox>
      {
        placeTheme === '술집' ?
        <ImageWrapper src={process.env.PUBLIC_URL + '/assets/RoomBackground/publichouse.jpg'} onClick={() => navigate(`/rooms/${roomId}`)}/> :
        placeTheme === '펍' ?
        <ImageWrapper src={process.env.PUBLIC_URL + '/assets/RoomBackground/pub.jpg'} onClick={() => navigate(`/rooms/${roomId}`)}/> :
        placeTheme === '칵테일바' ?
        <ImageWrapper src={process.env.PUBLIC_URL + '/assets/RoomBackground/cocktail.jpg'} onClick={() => navigate(`/rooms/${roomId}`)}/> :
        <ImageWrapper src={process.env.PUBLIC_URL + '/assets/RoomBackground/outside.jpg'} onClick={() => navigate(`/rooms/${roomId}`)}/>
      }
      <InfoWrapper>
        <InfoInnerWrapper>
          {roomName}
        </InfoInnerWrapper>
        <InfoInnerWrapper>
          {peopleLimit}
        </InfoInnerWrapper>
      </InfoWrapper>
        <TimeBox>
          {timeGap}시간 전
        </TimeBox>
    </RoomBox>
    </>
  )
}

export default LiveListItem