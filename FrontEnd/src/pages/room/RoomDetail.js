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

const onRoomDetail = async () => {
  const result = await client
    .get("rooms/1")
    .then((response)=> response);
    return result
}


const RoomDetail = () => {

  const [data, setData] = useState({});

  const dataRefineFunc = async () => {
    const result = await onRoomDetail()
    setData(result.data);
    // return data
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
            {data.roomName} | {data.category.categoryName}
          </div>
          <div>
            {data.placeTheme}
          </div>
          <div>
            {data.user.userName}
            {data.user.userImg}
            인기도{data.user.userPopularity}
          </div>
          <div>
            20대
          </div>          
        </Box>
        <GoToButton>참여하기</GoToButton>
      </Wrapper> 
    </>
  );
};

export default RoomDetail