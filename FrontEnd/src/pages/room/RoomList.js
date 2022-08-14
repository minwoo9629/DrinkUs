import Header from "../../components/layout/Header";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { client } from "../../utils/client"
import RoomListItem from "../../components/room/RoomListItem"
import PageNation from "../../components/common/buttons/PageNation";

// 필터
const FilterWrapper = styled.div`
  display: flex;
  background-color: black;
  width: 100vw;
  color: ${(props) => props.color};
  justify-content: center;
`

const FilterInnerWrapper = styled.div`
  width: ${(props) => props.width};
`

const Line = styled.hr`
  margin: 30px;
`

const LiveButton = styled.button`
  width: 160px;
  height: 48px;
  margin-right: 20px;
  border-radius: 30px;
  background-color: #EAF1FF;
  color: #676775;
  font-size: 18px;
  margin-top: 40px;
  line-height: 3px;
  border: 3px solid #BDCFF2;
  box-shadow: inset 0px 0px 4px 4px rgba(189, 207, 242, 0.5);
  cursor: pointer;
`

// 필터 안 박스 / 버튼
const SearchBox = styled.input`
  display: flex;
  width: 800px;
  height: 30px;
  border-radius: 30px;
  border: 3px solid #BDCFF2;
  box-shadow: inset 0px 0px 4px 4px rgba(189, 207, 242, 0.5);
`

const OptionWrapper = styled.div`
  width: 1000px;
  margin-left: 100px;
  margin-right: 100px;
  justify-content: space-between;
  align-items: center;
  display: flex;
`

const OptionInnerWrapper = styled.div`
  justify-content: space-between;
`

const SearchButton = styled.button `
  color: #6f92bf;
  width: 150px;
  height: 40px;
  border-radius: 30px;
  margin-top: 22px;
  border: 3px solid #BDCFF2;
  box-shadow: inset 0px 0px 4px 4px rgba(189, 207, 242, 0.5);
  font-size: 16px;
  cursor: pointer;
`

const SearchInnerWrapper = styled.div `
  margin-left: 100px;
  margin-right: 100px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

// 또래만 체크박스
const AgesWrapper = styled.div`
  display: inline-block;
  height: 36px;
  line-height: 32px;
  width: 160px;
  color: black;
  margin: 4px 4px 4px 24px;
  background-color: #ffffff;
  border-radius: 30px;
  border: 3px solid #eaf1ff;
  text-align: center;
  overflow: hidden;

  & input:checked + span {
    background-color: #BDCFF2;
  }
  & span {
    cursor: pointer;
    display: block;
    padding: 2px 16px;
  }
`;

const CheckBoxForm = styled.input`
  display: none;
  cursor: pointer;
`

const SelectBox = styled.select`
  width: 300px;
  height: 40px;
  background-color: white;
  border-radius: 20px;
  font-size: 16px;
  margin-left: 30px;
  border: 3px solid #BDCFF2;
  box-shadow: inset 0px 0px 4px 4px rgba(189, 207, 242, 0.5);
  cursor: pointer;
`

// 방 목록용 스타일
const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 24px 12px 100px 24px;
  gap: 30px;
  width: 1000px;
  height: 680px;
  margin-top: 50px;
  margin-bottom: 200px;
  border-radius: 20px;
  background-color: #6F92BF;
  box-shadow: inset 0px 0px 4px 4px rgba(189, 207, 242, 0.5);
`;

// 페이지네이션
const PageNationWrapper = styled.div`
  position: absolute;
  top: 1230px;
  left: 42%;
`

const RoomList = () => {
  
  const navigate = useNavigate();

  // 검색
  const [filter, setFilter] = useState({
    searchKeyword: '',
    sortOrder: '1',
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
      <FilterWrapper>
        <FilterInnerWrapper width={'1200px'}>
          <div>
            <LiveButton onClick={() => navigate("/createroom")} color={"cornflowerblue"}>방 만들기</LiveButton>
            <LiveButton onClick={() => navigate("/live")} color={"#EAF1FF"}>추천 방 보기</LiveButton>
          </div>
        </FilterInnerWrapper>
      </FilterWrapper>
      <FilterWrapper color={'white'}>
        <FilterInnerWrapper width={'1200px'}>
        <Line/>
        <OptionWrapper>
          <OptionInnerWrapper>
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
          </OptionInnerWrapper>
          <OptionInnerWrapper>
            <SelectBox 
              type="selectbox"
              name="sortOrder"
              onChange={onFilterInput}
              >
              <option value="1">최신순</option>
              <option value="0">오래된 순</option>
            </SelectBox>
          </OptionInnerWrapper>
          <AgesWrapper>
            <label>
              <CheckBoxForm
              type="checkbox"
              name="sameAge"
              onChange={onSameAgeCheck}
              />
            <span>또래만 만날래요</span>
            </label>
          </AgesWrapper>
        </OptionWrapper>
        </FilterInnerWrapper>        
      </FilterWrapper>
      <FilterWrapper>
        <FilterInnerWrapper width={'1200px'}>
          <SearchInnerWrapper width={'1200px'}>
            <div>
              검색창
            <SearchBox
              type="text"
              value={filter.searchKeyword}
              name="searchKeyword"
              onChange={onFilterInput} 
            ></SearchBox>
            </div>
              <SearchButton onClick={()=>{fetchFilterState(0), onHandleReset()}}>검색하기</SearchButton>
            </SearchInnerWrapper>
          <Line/>
        </FilterInnerWrapper>
      </FilterWrapper>
      {/* 방 목록 */}
      <FilterWrapper color={'black'}>
        <ListWrapper>
          {filterState.content.length <= 0 ? 
          ( <div>딱 맞는 방이 없어요. 다른 조건으로 검색해 보세요!</div> ) : (
            <>
              {filterState.content.map((room, index) => (
              <RoomListItem
              {...room}
              key={index}
              />
              ))}
            </>
          )}
          <PageNationWrapper>
            <PageNation
              onClick={onHandlePageButton}
              number={filterState.number + 1}
              size={filterState.size}
              totalPages={filterState.totalPages}
            />
          </PageNationWrapper>
        </ListWrapper>
      </FilterWrapper>
      
    </>
  );
};

export default RoomList