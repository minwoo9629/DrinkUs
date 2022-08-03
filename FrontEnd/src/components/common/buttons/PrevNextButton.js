import styled from "styled-components";

const PrevNextButtonStyled = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  padding: 8px;
  background-color: transparent;
  border: 2px solid #bdcff2;
  border-radius: 100%;
  cursor: pointer;
  &.active {
    border: 1px solid #bdcff2;
    background-color: #bdcff2;
    border-radius: 100%;
  }
  &.disable {
    cursor: default;
  }
`;

const PrevNextButton = ({ type, onClick, number, totalPages }) => {
  console.log(number);
  console.log("앞뒤버튼");
  return (
    <>
      {type === "left" ? (
        <PrevNextButtonStyled
          onClick={onClick}
          disabled={parseInt(number) === 1 ? true : false}
          className={parseInt(number) === 1 ? "disable" : ""}
        >
          <i className="fas fa-angle-left"></i>
        </PrevNextButtonStyled>
      ) : (
        <PrevNextButtonStyled
          onClick={onClick}
          disabled={parseInt(number) === totalPages ? true : false}
          className={parseInt(number) === totalPages ? "disable" : ""}
        >
          <i className="fas fa-angle-right"></i>
        </PrevNextButtonStyled>
      )}
    </>
  );
};

export default PrevNextButton;
