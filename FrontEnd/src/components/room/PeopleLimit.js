import styled from "styled-components";

const InputForm = styled.input`
  background-color: white;
  width: 800px;
  height: 100px;
`

const PeopleLimit = () => {
  return (
    <div>
      인원
      <InputForm type="text" rules={[{ required: true, message: '최대인원을 입력하세요.'}]} name="peoplelimit"></InputForm>
    </div>
  );
};

export default PeopleLimit;