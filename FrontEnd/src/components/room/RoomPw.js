import styled from "styled-components";

const InputForm = styled.input`
  background-color: white;
  width: 800px;
  height: 100px;
`

const RoomPw = () => {
  return (
    <div>
      비밀번호
      <InputForm type="text" name="roompw"/>
    </div>
  )
};

export default RoomPw;