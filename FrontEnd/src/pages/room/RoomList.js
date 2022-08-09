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

  // 기본 방 목록 불러오기
    const onRoomList = async (pageNum) => {
      const result = await client
      .get(`/rooms`, {
        params: {
          page: pageNum,
          searchKeyword: "",
          sameAge: false,
          sortOrder: 0,
          categoryId: null
        },
      })
        .then((response)=>response);
        return result
    }

  const [BasicData, setBasicData] = useState({
    content: [],
    number: 0,
    numberOfElements: 0,
    size: 0,
    totalPages: 0
  });
  const fetchData = async (pageNum) => {
    const response = await onRoomList(pageNum);
    setBasicData({...response.data});
  };
  const onHandlePageButton = (pageNum) => {
    fetchData(pageNum);
  };

  useEffect(()=>{
    fetchData();
  },[])

  // 검색 로직
  const [filter, setFilter] = useState({
    searchKeyword: '',
    sortOrder: '0',
    categoryId: ''
  });

  const onFilterInput = (e) => {
    setFilter({...filter, [e.target.name]: e.target.value});
  };
  
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

  const [filterData, setFilterData] = useState({
    content: [],
    number: 0,
    numberOfElements: 0,
    size: 0,
    totalPages: 0
  });
  const fetchFilterData = async (pageNum) => {
    const response = await onMakeRoomList(pageNum);
    setFilterData({...response.data});
    if (filterData.length === 0) {
      alert("검색 결과가 없습니다.")
    }
  };

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
          <FilterButton onClick={fetchFilterData}>검색하기</FilterButton>
        </LetterColorChange>
      </Wrapper>
      {/* 방 목록 */}
      <Wrapper color={'#fff'}>
        <GlobalStyle />
        {BasicData.content.map((room, index) => {
          if (filterData.content.length === 0) {
            return (
              <RoomListItem
                {...room}
                key={index}
              />
              
        )
        }})}
        {filterData.content.map((room, index) => (
          <RoomListItem
          {...room}
          key={index}
          />
        ))}
        
      </Wrapper>
      <div>
      <PageNation
        onClick={onHandlePageButton}
        number={BasicData.number + 1}
        size={BasicData.size}
        totalPages={BasicData.totalPages}
      />
      </div>
      <div>
      <PageNation
        onClick={onHandlePageButton}
        number={filterData.number + 1}
        size={filterData.size}
        totalPages={filterData.totalPages}
      />
      </div>
    </>
  );
};

export default RoomList