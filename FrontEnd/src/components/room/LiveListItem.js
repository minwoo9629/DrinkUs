import styled from "styled-components";
import { TimeGap } from "../../utils/TimeGap";
import { useNavigate } from "react-router-dom";

const RoomBox = styled.div`
  padding: 0px 0px 20px 0px;
  flex-direction: row;
  background-color: rgba(18, 21, 39, 0.86);
  width: 278px;
  height: 188px;
  border-radius: 10px;
  margin-right: 26px;
  &:hover {
    color: #fff;
    transition: all 0.5s linear;
    transform: scale(1.05);
  }
`;

const ImageWrapper = styled.img`
  width: 278px;
  height: 140px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const InfoWrapper = styled.div`
  margin: 4px 8px 4px 16px;
  justify-content: space-between;
  display: flex;
`;

const InfoInnerWrapper = styled.div`
  height: 20px;
  font-size: 16px;
  color: ${(props) => props.color};
`;

const TimeBox = styled.div`
  margin-left: 16px;
  color: ${(props) => props.color};
`;

const LiveListItem = ({ roomId, roomName, placeTheme, createdDate }) => {
  const navigate = useNavigate();

  const timeGap = TimeGap(createdDate);

  return (
    <>
      <RoomBox>
        {placeTheme === "술집" ? (
          <ImageWrapper
            src={
              process.env.PUBLIC_URL + "/assets/RoomBackground/publichouse.jpg"
            }
            onClick={() => navigate(`/rooms/${roomId}`)}
          />
        ) : placeTheme === "펍" ? (
          <ImageWrapper
            src={process.env.PUBLIC_URL + "/assets/RoomBackground/pub.jpg"}
            onClick={() => navigate(`/rooms/${roomId}`)}
          />
        ) : placeTheme === "칵테일바" ? (
          <ImageWrapper
            src={process.env.PUBLIC_URL + "/assets/RoomBackground/cocktail.jpg"}
            onClick={() => navigate(`/rooms/${roomId}`)}
          />
        ) : placeTheme === "야구장" ? (
          <ImageWrapper
            src={process.env.PUBLIC_URL + "/assets/RoomBackground/baseball.jpg"}
            onClick={() => navigate(`/rooms/${roomId}`)}
          />
        ) : placeTheme === "축구장" ? (
          <ImageWrapper
            src={process.env.PUBLIC_URL + "/assets/RoomBackground/soccer.jpg"}
            onClick={() => navigate(`/rooms/${roomId}`)}
          />
        ) : placeTheme === "페스티벌" ? (
          <ImageWrapper
            src={process.env.PUBLIC_URL + "/assets/RoomBackground/festival.jpg"}
            onClick={() => navigate(`/rooms/${roomId}`)}
          />
        ) : placeTheme === "클럽" ? (
          <ImageWrapper
            src={process.env.PUBLIC_URL + "/assets/RoomBackground/club.jpg"}
            onClick={() => navigate(`/rooms/${roomId}`)}
          />
        ) : placeTheme === "편의점" ? (
          <ImageWrapper
            src={
              process.env.PUBLIC_URL + "/assets/RoomBackground/convenience.jpg"
            }
            onClick={() => navigate(`/rooms/${roomId}`)}
          />
        ) : placeTheme === "한강공원" ? (
          <ImageWrapper
            src={process.env.PUBLIC_URL + "/assets/RoomBackground/river.jpg"}
            onClick={() => navigate(`/rooms/${roomId}`)}
          />
        ) : placeTheme === "미술관" ? (
          <ImageWrapper
            src={process.env.PUBLIC_URL + "/assets/RoomBackground/art.jpg"}
            onClick={() => navigate(`/rooms/${roomId}`)}
          />
        ) : placeTheme === "영화관" ? (
          <ImageWrapper
            src={process.env.PUBLIC_URL + "/assets/RoomBackground/movie.jpg"}
            onClick={() => navigate(`/rooms/${roomId}`)}
          />
        ) : placeTheme === "도서관" ? (
          <ImageWrapper
            src={process.env.PUBLIC_URL + "/assets/RoomBackground/library.jpg"}
            onClick={() => navigate(`/rooms/${roomId}`)}
          />
        ) : (
          <ImageWrapper
            src={process.env.PUBLIC_URL + "/assets/RoomBackground/outside.jpg"}
            onClick={() => navigate(`/rooms/${roomId}`)}
          />
        )}
        <InfoWrapper>
          <InfoInnerWrapper color={"#fff"}>{roomName}</InfoInnerWrapper>
        </InfoWrapper>
        <TimeBox color={"#676775"}>{timeGap}</TimeBox>
      </RoomBox>
    </>
  );
};

export default LiveListItem;
