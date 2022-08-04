import styled from "styled-components";

const InputForm = styled.input`
  background-color: white;
  width: 800px;
  height: 100px;
`

const RoomName = () => {
  return (
    <div>
      방 이름
      <InputForm type="text" rules={[{ required: true, message: '방 이름을 입력하세요.'}]} name="roomname"></InputForm>
    </div>
  );
};

export default RoomName;