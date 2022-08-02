import styled from "styled-components";

const SelectBox = styled.select`
 width: 200px;
 background-color: white;
 border: 3px solid #BDCFF2;
 height: 56px;
 border-radius: 20px;
 font-size: 16px;
`

const Category = () => {
  return (
    <div>
      관심사 선택
      <SelectBox>
        <option>스포츠</option>
        <option>음악</option>
        <option>게임/오락</option>
        <option>문화</option>
        <option>기타</option>
      </SelectBox>
    </div>
  );
};

export default Category;