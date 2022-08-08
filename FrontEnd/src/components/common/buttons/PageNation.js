import styled from "styled-components";
import { CalcPaginationRange } from "../../../utils/CalcPaginationRange";
import { BaseFlexWrapper } from "../../styled/Wrapper";

const PageButtonWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  width: 60%;
  justify-content: space-between;
`;

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

const PageNation = ({ number, size, totalPages, onClick }) => {
  const paginationRange = CalcPaginationRange(number, size, totalPages);
  return (
    <BaseFlexWrapper>
      <PageButtonWrapper>
        <PrevNextButtonStyled
          onClick={() => onClick(number - 2)}
          disabled={parseInt(number) === 1 ? true : false}
          className={parseInt(number) === 1 ? "disable" : ""}
        >
          <i className="fas fa-angle-left"></i>
        </PrevNextButtonStyled>
        {paginationRange.map((item, idx) => (
          <li key={idx}>
            <PageButtonStyled
              onClick={() => onClick(item - 1)}
              className={number === parseInt(item) ? "active" : ""}
            >
              {item}
            </PageButtonStyled>
          </li>
        ))}
        <PrevNextButtonStyled
          onClick={() => onClick(number)}
          disabled={parseInt(number) === totalPages ? true : false}
          className={parseInt(number) === totalPages ? "disable" : ""}
        >
          <i className="fas fa-angle-right"></i>
        </PrevNextButtonStyled>
      </PageButtonWrapper>
    </BaseFlexWrapper>
  );
};

export default PageNation;
