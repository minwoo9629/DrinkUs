import styled from "styled-components";
import { CalcPaginationRange } from "../../../utils/CalcPaginationRange";
import { BaseFlexWrapper } from "../../styled/Wrapper";
import PageButton from "./PageButton";
import PrevNextButton from "./PrevNextButton";

const PageButtonWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  width: 60%;
  justify-content: space-between;
`;
const PageNationButton = ({
  number,
  size,
  totalPages,
  onHandleNext,
  onHandlePrevious,
  onHandlePageButton,
}) => {
  const paginationRange = CalcPaginationRange(number, size, totalPages);
  return (
    <BaseFlexWrapper>
      <PageButtonWrapper>
        <PrevNextButton
          type={"left"}
          onClick={onHandlePrevious}
          number={number}
        />
        {paginationRange.map((item, idx) => (
          <li key={idx}>
            <PageButton
              text={item}
              onClick={onHandlePageButton}
              number={number}
            />
          </li>
        ))}
        <PrevNextButton
          type={"right"}
          onClick={onHandleNext}
          number={number}
          totalPages={totalPages}
        />
      </PageButtonWrapper>
    </BaseFlexWrapper>
  );
};

export default PageNationButton;
