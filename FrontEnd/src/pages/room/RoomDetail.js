import Header from "../../components/layout/Header";
import { Wrapper } from "../../components/styled/Wrapper";
import { client } from "../../utils/client"
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { GoToButton } from "../../components/common/buttons/GoToButton";

const Box = styled.div`
  background-color: white;
`



const RoomDetail = (roomId) => {
  
  const onRoomDetail = async () => {
    const result = await client
      .get(`rooms/${roomId}`)
      .then((response)=> response);
      console.log(result)
      return result
  }

  const [data, setData] = useState({});

  const dataRefineFunc = async () => {
    const result = await onRoomDetail()
    setData(result.data);
    console.log(result)
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
        {JSON.stringify(roomId)}
        </Box>
        <GoToButton>참여하기</GoToButton>
      </Wrapper> 
    </>
  );
};

export default RoomDetail