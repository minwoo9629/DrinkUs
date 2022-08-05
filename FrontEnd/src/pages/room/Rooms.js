import Header from "../../components/layout/Header";
import { GoToButton } from "../../components/common/buttons/GoToButton";
import { Wrapper } from "../../components/styled/Wrapper";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
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

// 방 목록용 스타일
const GlobalStyle = styled.div`
  body {
    margin: 0;
  }
`;

const Post = styled.div`
  border: 1px solid black;
  border-radius: 20px;
  background: white;
  box-shadow: 10px 5px 5px #7f8fa6;
`;

const Title = styled.div`
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
  font-weight: 600;
`;

const Body = styled.div`
  height: 80%;
  padding: 11px;
  border-radius: 20px;
`;


// 기본 방 목록 불러오기
  const onRoomList = async () => {
    const result = await client
    .get(`/rooms`, {
      params: {
        page: 1,
        searchKeyword: "",
        sameAge: false,
        sortOrder: 0,
        categoryId: null 
      },
    })
      .then((response)=>response);
      return result
  }
  
  
const Rooms = () => {

  const navigate = useNavigate();

  // 기본 방 목록 데이터만 추출하기
  const [basicData, setBasicData] = useState([]);

  const dataRefineFunc = async () => {
    const result = await onRoomList()
    setBasicData([...result.data.content]);
    return basicData
  }

  useEffect(()=>{
    dataRefineFunc();
  },[])


  // 검색 로직
  const [filter, setFilter] = useState({
    searchKeyword: '',
    sortOrder: '',
    categoryId: ''
  });

  const onFilterInput = (e) => {
    setFilter({...filter, [e.target.name]: e.target.value});
    console.log(filter)
  };
  
  const onMakeRoomList = (e) => {
    e.preventDefault();
    client
      .get(`/rooms`, {
        params: {
          page: 1,
          searchKeyword: filter.searchKeyword,
          sameAge: SameAge,
          sortOrder: filter.sortOrder,
          categoryId: filter.categoryId 
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // 체크박스
  const [SameAge, setSameAge] = useState(true);

  const onSameAgeCheck = ({target}) => {
    target.checked? setSameAge(false):setSameAge(true);
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
              name="categoryId" 
              onChange={onFilterInput}>
              <option value="null">관심사 없음</option>
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
      {/* 방 목록 */}
      <Wrapper>
        <GlobalStyle />
        {basicData.map((room, index) => (
          <Post key={index}>
            <Title>{room.roomName}</Title>
            <Body>{room.placeTheme}</Body>
          </Post>
        ))}
      </Wrapper>
    </>
  );
};

export default Rooms