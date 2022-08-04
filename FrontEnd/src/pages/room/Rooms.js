import Header from "../../components/layout/Header";
import { GoToButton } from "../../components/common/buttons/GoToButton";
import { Wrapper } from "../../components/styled/Wrapper";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { client } from "../../utils/client"


const SearchBox = styled.input`
  display: flex;
  width: 800px;
  height: 100px;
`

const FilterButton = styled.button `
  color: #6f92bf;
  width: 80px;
  height: 30px;
`

const LetterColorChange = styled.div`
  color: white;
`

const CheckBoxForm = styled.input`
  background-color: white;
  width: 30px;
  height: 30px;
`

const SelectBox = styled.select`
 width: 200px;
 background-color: white;
 border: 3px solid #BDCFF2;
 height: 56px;
 border-radius: 20px;
 font-size: 16px;
`

const RoomContent = styled.div`
  width: 200px;
  height: 200px;
  background-color: white;
  border: 3px solid #BDCFF2;
`

const Rooms = () => {

  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    searchKeyword: '',
    sortOrder: ''
  });

  const onFilterInput = (e) => {
    setFilter({...filter, [e.target.name]: e.target.value});
    console.log(filter)
  };
  
  const onMakeRoomList = (e) => {
    e.preventDefault();
    client
      // .get("https://i7b306.p.ssafy.io/api/rooms?page=1", {
        .get("http://localhost:8080/api/rooms?page=1", {
        searchKeyword: filter.searchKeyword,
        sameAge: SameAge,
        sortOrder: filter.sortOrder,
        category: makecategory.category,
      })
      .then(function (response) {
        console.log(response.data.message);
      })
  }

  // 카테고리
  const [makecategory, setMakeCategory] = useState({
    category: ''
  })

  const onMakeCategory = (e) => {
    setMakeCategory({...makecategory, [e.target.name]: {categoryId:e.target.value}});
    console.log(makecategory)
  }

  // 체크박스
  const [SameAge, setSameAge] = useState(true);

  const onSameAgeCheck = ({target}) => {
    target.checked? setSameAge(false):setSameAge(true);
    console.log(SameAge)
    return SameAge
  }

  return (
    <>
      <Header />
      <Wrapper>
        <LetterColorChange>
          <div>
            <GoToButton onClick={() => navigate("/createroom")} color={"cornflowerblue"}>방 만들기</GoToButton>
            <GoToButton onClick={() => navigate("/live")} color={"#EAF1FF"}>추천 방 보기</GoToButton>
          </div>
          <div>
            검색창
            <SearchBox
              type="text"
              value={filter.searchKeyword}
              name="searchKeyword"
              onChange={onFilterInput} 
            ></SearchBox>
          </div>
          <div>
          관심사 선택
            <SelectBox 
              type="selectbox"
              name="category" 
              onChange={onMakeCategory}>
              <option value="1">스포츠</option>
              <option value="2">음악</option>
              <option value="3">게임/오락</option>
              <option value="4">문화</option>
              <option value="5">기타</option>
            </SelectBox>
          </div>
          <div>
            또래만 만날래요
            <CheckBoxForm
              type="checkbox"
              name="sameAge"
              onChange={onSameAgeCheck}
            />
          </div>
          <div>
            <SelectBox 
              type="selectbox"
              name="sortOrder"
              onChange={onFilterInput}
              >
              <option value="0">오래된 순</option>
              <option value="1">최신순</option>
            </SelectBox>
          </div>
          <FilterButton onClick={onMakeRoomList}>검색하기</FilterButton>
        </LetterColorChange>
      </Wrapper>
      <Wrapper>
        <RoomContent> 방 내용이 들어갈 거에요 </RoomContent>  
      </Wrapper>      
    </>
  );
};

export default Rooms