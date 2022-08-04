import styled from "styled-components";

const PageButtonStyled = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  padding: 8px;
  background-color: transparent;
  cursor: pointer;
  &.active {
    border: 1px solid #bdcff2;
    background-color: #bdcff2;
    border-radius: 100%;
  }
  &.disable {
    cursor: none;
  }
`;

const PageButton = ({ text, onClick, number }) => {
  return (
    <PageButtonStyled
      onClick={() => onClick(text)}
      className={number === parseInt(text) ? "active" : ""}
    >
      {text}
    </PageButtonStyled>
  );
};

export default PageButton;
