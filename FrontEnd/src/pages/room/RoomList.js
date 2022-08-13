import Header from "../../components/layout/Header";
import { GoToButton } from "../../components/common/buttons/GoToButton";
import { Wrapper } from "../../components/styled/Wrapper";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { client } from "../../utils/client"
import RoomListItem from "../../components/room/RoomListItem"
import PageNation from "../../components/common/buttons/PageNation";


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

const RoomList = () => {
  
  const navigate = useNavigate();

  // 검색
  const [filter, setFilter] = useState({
    searchKeyword: '',
    sortOrder: '0',
    categoryId: null
  });

  // input 값을 filter에 넣어주는 함수
  const onFilterInput = (e) => {
    setFilter({...filter, [e.target.name]: e.target.value});
  };

  // 검색이 끝나면 초기화
  const onHandleReset = () => {
    setFilter({searchKeyword: ''})
  }
   
  // api 요청
  const onMakeRoomList = async (pageNum) => {
    const result = await client
      .get(`/rooms`, {
        params: {
          page: pageNum,
          searchKeyword: filter.searchKeyword,
          sameAge: SameAge,
          sortOrder: filter.sortOrder,
          categoryId: filter.categoryId
        },
      })
      .then((response)=>response);
      return result
  }

  // pagenation을 위한 state
  const [filterState, setFilterState] = useState({
    content: [],
    number: 0,
    numberOfElements: 0,
    size: 0,
    totalPages: 0
  });

  const fetchFilterState = async (pageNum) => {
    const response = await onMakeRoomList(pageNum);
    setFilterState({...response.data});
  };
  const onHandlePageButton = (pageNum) => {
    fetchFilterState(pageNum);
  };

  useEffect(()=>{
    fetchFilterState();
  },[])

  // 체크박스
  const [SameAge, setSameAge] = useState(false);

  const onSameAgeCheck = ({target}) => {
    target.checked? setSameAge(true):setSameAge(false);
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
              <option value="0">관심사 없음</option>
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
          <FilterButton onClick={()=>fetchFilterState(0)}>검색하기</FilterButton>
        </LetterColorChange>
      </Wrapper>
      {/* 방 목록 */}
      <Wrapper color={'#fff'}>
        <GlobalStyle />
        {filterState.content.length <= 0 ? (
          <div>딱 맞는 방이 없어요. 다른 조건으로 검색해 보세요!</div>
        ): (
          <>
            {filterState.content.map((room, index) => (
            <RoomListItem
            {...room}
            key={index}
            />
            ))}
          </>
        )}
      </Wrapper>
      <div>
      <PageNation
        onClick={onHandlePageButton}
        number={filterState.number + 1}
        size={filterState.size}
        totalPages={filterState.totalPages}
      />
      </div>
    </>
  );
};

export default RoomList