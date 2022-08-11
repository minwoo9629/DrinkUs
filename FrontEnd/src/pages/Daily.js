import { useState, useEffect } from "react";
import styled from "styled-components";
import { BaseFlexColWrapper } from "../components/styled/Wrapper";
import Header from "../components/layout/Header";
import { useNavigate } from "react-router-dom";
import { CalendarButton } from "../components/common/buttons/CalendarButton";
import {
  getDailyArticle,
  postDailyArticle,
  editDailyArticle,
  deleteDailyArticle,
  getDailyComment,
  postDailyComment,
  editDailyComment,
  deleteDailyComment
} from "../api/DailyAPI";
import DailyList from "../components/daily/DailyList";
import CommentList from "../components/daily/CommentList";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background-color: white;
`

// 글쓰기 인풋 div
const DailyArticleInputWrapper = styled.div`
  justify-content: space-between;
  width: 80vw;
  height: 8vh;
  border-radius: 16px;
  border: 4px #6f92bf;
  background-color: white;
  margin: 14px;
  position: relative;
`

// // 글, 댓글 전체 리스트 div
// const DailyBoardWrapper = styled.div`
//   justify-content: space-between;
//   width: 80vw;
//   height: 60vh;
//   border-radius: 16px;
//   border: 4px #6f92bf;
//   background-color: white;
//   margin: 14px;
//   position: relative;
// `

// 글, 댓글 개별 div
const DailyListWrapper = styled.div`
  justify-content: space-between;
  width: 80vw;
  height: 20vh;
  border-radius: 16px;
  border: 4px #6f92bf;
  background-color: white;
  margin: 14px;
  position: relative;
`

// // 작성된 글 감쌀 div
// const DailyArticleWrapper = styled.div`
//   justify-content: space-between;
//   width: 72vw;
//   height: 8vh;
//   border-radius: 4px;
//   border: solid #eaf1ff;
//   background-color: white;
//   margin: 4px;
//   position: relative;
//   display: flex;
// `

// 프사 감쌀 div
const ProfileWrapper = styled.div`
  display: column;
  margin: 8px;
`;


// 프사
const ProfileImg = styled.div`
  padding: 8px;
  border-radius: 24px;
  width: 24px;
  height: 24px;
  background-color: #6f92bf;
`;

const DailyContent = styled.div`
  display: column;
  justify-content: center;
  align-items: center;
`

// 글쓰기 인풋
const DailyArticleInput = styled.input`
  justify-content: space-between;
  width: 64vw;
  height: 8vh;
  border-radius: 4px;
  border: #6f92bf;
  background-color: #eaf1ff;
  margin: 4px;
  position: relative;
`

// 댓글 인풋 감쌀 div
const DailyCommentInputWrapper = styled.div`
  justify-content: space-between;
  width: 64vw;
  height: 10vh;
  border-radius: 4px;
  border: #6f92bf;
  background-color: #eaf1ff;
  margin: 4px;
  position: relative;
`

// 댓글 인풋
const DailyCommentInput = styled.input`
  justify-content: space-between;
  width: 64vw;
  height: 8vh;
  border-radius: 4px;
  border: #6f92bf;
  background-color: #eaf1ff;
  margin: 4px;
  position: relative;
`

// 글쓰기 버튼
const DailyArticlePostButton = styled.button`
  padding: 12px 24px;
  border-radius: 3px;
  background-color: #bdcff2;
  color: white;
  font-size: 16px;
  margin: 4px;
  border: 1px #eaf1ff;
`

// 글, 댓글 수정 삭제 버튼
const DailyBoardEditButton = styled.button`
  padding: 4px 8px;
  background-color: white;
  color: gray;
  font-size: 8px;
  margin: 4px;
  border: 1px white;
`

// 댓글 달기 버튼
const DailyCommentPostButton = styled.button`
  padding: 12px 24px;
  border-radius: 3px;
  background-color: #bdcff2;
  color: white;
  font-size: 16px;
  margin: 4px;
  border: 1px #eaf1ff;
`


const DailyBoardComment = styled.div`
  justify-content: space-between;
  width: 64vw;
  height: 8vh;
  border-radius: 4px;
  border: solid #eaf1ff;
  background-color: white;
  margin: 4px;
  margin-left: 10%;
  margin-right: 10%;
  position: relative;
  display: flex;
`

const TopMenuWrap = styled.div`
/* justify-content: space-between; */
display: flex;
align-items: center;
`;

const Daily = () => {
  // 상태 저장
  const [state, setState] = useState({
    // 받아온 정보
    content: [],
    // boardId: "",
    // createrId: "",
    // boardContent: "",
    // 보낼 정보
    boardArticle: "",
    boardComment: "",
    // 댓글 창 여닫을 때 필요한 값
    isComment: false,
  })
  const [comment, setComment] = useState({
    boardContent: "",
  })

  const navigate = useNavigate();

  // 전체 글 fetch
  const fetchArticle = async () => {
    const response = await getDailyArticle();
    setState({...response.data});
    console.log(response.data.content)
  };

  // useEffect를 이용하여 전체 게시글 fetch 하기
  useEffect(() => {
    fetchArticle();
  }, []);

  // 입력
  const onHandleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
      
  // 글 작성  --> 작성하면 화면에 바로 나타나게 해야할듯
  const onArticlePost = async (e) => {
    // e.preventDefault();
    const data = {
      boardContent: state.boardArticle
    };
    const response = await postDailyArticle(data);
    if (response.status === 200) {
      setState({...state, boardArticle: ""})
    }
    };
    
  // 글 수정
  const onArticleEdit = async (e) => {
    const data = {
      boardContent: state.boardArticle
    };
    const response = await editDailyArticle(data);
    if (response.status === 200) {
      setState({...state, boardArticle: ""})
    }
  };
    
  // 글 삭제
  const onArticleDelete = async (e) => {
    const data = {
      boardContent: state.boardArticle
    };
    const response = await deleteDailyArticle(data);
    if (response.status === 200) {
      setState({...state, boardArticle: ""})
    }
  };

  // 댓글 창 여닫기
  const onHandleComment = (e) => {
    if(!state.isComment){
      setState({...state, isComment: !state.isComment, boardComment:""})
    }else{
      setState({...state, isComment: !state.isComment, boardComment:""})
    }
  }

  // 댓글 조회
  const getComment = async(e) => {
    const response = await getDailyComment();
    setState({...response.data});
    console.log(response.data.content)
  }

  // 댓글 작성
  const onCommentPost = async (e) => {
    const data = {
      boardContent: state.boardArticle
    };
    const response = await postDailyComment(data);
    if (response.status === 200) {
      setState({...state, boardArticle: ""})
    }
  };

  // 댓글 수정
  const onCommentEdit = async (e) => {
    const data = {
      boardContent: state.boardArticle
    };
    const response = await editDailyComment(data);
    if (response.status === 200) {
      setState({...state, boardArticle: ""})
    }
  };

  // 댓글 삭제
  const onCommentDelete = async (e) => {
    const data = {
      boardContent: state.boardArticle
    };
    const response = await deleteDailyComment(data);
    if (response.status === 200) {
      setState({...state, boardArticle: ""})
    }
  };

  return (
    <>
      <Header />
      <Wrapper>
        <BaseFlexColWrapper>
          <TopMenuWrap>
            <div>
              <CalendarButton onClick={() => navigate("/calendar")} color={"#ffffff"} textColor={"#6F92BF"}>월간</CalendarButton>
              <CalendarButton onClick={() => navigate("/daily")} color={"#bdcff2"} textColor={"#fff"}>일간</CalendarButton>
            </div>
          </TopMenuWrap>
          <DailyArticleInputWrapper>
            <DailyArticleInput
              placeholder="글을 작성하세요"
              type="string"
              value={state.boardArticle}
              name="boardArticle"
              onChange={onHandleInput}
            />
            <DailyArticlePostButton onClick={onArticlePost}>
              글쓰기
            </DailyArticlePostButton>
          </DailyArticleInputWrapper>
          <div>
            <DailyList dailyList={state.content}/>
          </div>
        </BaseFlexColWrapper>
      </Wrapper>
    </>
  )
}

export default Daily;