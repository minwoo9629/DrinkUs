import Header from "../components/layout/Header";
import styled from "styled-components";
import axios from "axios";


const Wrapper = styled.div`
background-color: #eaf2ff;
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`;

const ReportsButton = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 8px;
  border: 4px white;
  background-color: #bdcff2;
  margin: 14px;
  font-size: 20px;
  color: #676775;
`

const Reports = () => {
  
  const onReportsSubmit = (e) => {
    e.preventDefault();
    // 신고 사유 비어 있으면 alert 창 뜨게 할까?
    axios
        .post("http://localhost:8080/reports", {
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
  };

  return(
    <>
      <Header></Header>
      <Wrapper>
          유저를 신고합니다.
        <ReportsButton onClick={onReportsSubmit}>
          유저신고
        </ReportsButton>
      </Wrapper>
    </>
    )
};

export default Reports;