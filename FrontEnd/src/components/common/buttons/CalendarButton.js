import styled from "styled-components";
export const CalendarButton = styled.button`
  padding: 12px 24px;
  background-color: ${({ color }) => color};
  color: ${({ textColor }) => textColor};
  font-size: 18px;
  margin: auto 0;
  border: 1px solid #bdcff2;
  cursor: pointer;
`;