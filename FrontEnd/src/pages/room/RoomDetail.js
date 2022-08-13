import Header from "../../components/layout/Header";
import { Wrapper } from "../../components/styled/Wrapper";
import { client } from "../../utils/client";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { GoToButton } from "../../components/common/buttons/GoToButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Box = styled.div`
  background-color: white;
  width: 800px;
  height: 600px;
`

const RoomDetail = () => {
  // Room 입장을 위한 세션설정
  const dispatch = useDispatch();
  const navigate = useNavigate();  

  const location = useLocation();

  const onRoomDetail = async () => {
    const result = await client
      .get(`${location.pathname}`)
      .then((response) => response);
    return result;
  };

  const [data, setData] = useState({});

  const dataRefineFunc = async () => {
    const result = await onRoomDetail();
    setData(result.data);
    return data;
  };

  useEffect(() => {
    dataRefineFunc();
  }, []);

  const onHandleEnterRoom = () => {
    const sessionData = {
      sessionName: `Session${data.roomId}`,
    };
    dispatch(setRoomSession(sessionData));
    navigate("/room/detail");
  };


  return (
    <>
      <Header />
      <Wrapper>
        <Box>
          {JSON.stringify(data.roomName)}
          {JSON.stringify(data.category)}
          {JSON.stringify(data.peopleLimit)}
          {JSON.stringify(data.roomId)}
        </Box>
        <GoToButton onClick={onHandleEnterRoom}>참여하기</GoToButton>
      </Wrapper>
    </>
  );
};

export default RoomDetail;
