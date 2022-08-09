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

const onRoomDetail = async (roomId) => {
  const result = await client
    .get(`rooms/${roomId}`)
    .then((response)=> response);
    return result
}


const RoomDetail = () => {

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
          <div>
            {/* {JSON.stringify(data.roomId)} */}
            {/* {data.roomId} |
            {data.roomName} | 
            {data.createdDate} |
            {data.peopleLimit} */}
          </div>
          <div>
            {/* {data.placeTheme} */}
          </div>
          <div>
            {/* {data.user.userName} */}
            {/* {data.user.userImg} */}
            {/* 인기도{data.user.userPopularity} */}
          </div>       
        </Box>
        <GoToButton>참여하기</GoToButton>
      </Wrapper> 
    </>
  );
};

export default RoomDetail