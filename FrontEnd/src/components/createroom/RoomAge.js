import styled from "styled-components";

const SelectBox = styled.select`
 width: 200px;
 background-color: white;
 border: 3px solid #BDCFF2;
 height: 56px;
 border-radius: 20px;
 font-size: 16px;
`

const RoomAge = () => {
  return (
    <div>
      나이대 선택
      <SelectBox name="roomage">
        <option>20</option>
        <option>30</option>
        <option>40</option>
        <option>50</option>
        <option>60</option>
        <option>70대 이상</option>
      </SelectBox>
    </div>
  );
};

export default RoomAge;