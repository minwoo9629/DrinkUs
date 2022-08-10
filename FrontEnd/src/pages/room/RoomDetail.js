import Header from "../../components/layout/Header";
import { Wrapper } from "../../components/styled/Wrapper";
import { client } from "../../utils/client"
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { GoToButton } from "../../components/common/buttons/GoToButton";
import { useLocation } from "react-router-dom";

const Box = styled.div`
  background-color: white;
  width: 800px;
  height: 600px;
`

const RoomDetail = () => {

  const location = useLocation();
  
  const onRoomDetail = async () => {
    const result = await client
      .get(`${location.pathname}`)
      .then((response)=> response);
      return result
  }

  const [data, setData] = useState({});

  const dataRefineFunc = async () => {
    const result = await onRoomDetail()
    setData(result.data);
    return data
  }

  useEffect(()=>{
    dataRefineFunc();
  },[])

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
        <GoToButton>참여하기</GoToButton>
      </Wrapper> 
    </>
  );
};

export default RoomDetail