import styled from "styled-components";
export const CalendarButton = styled.button`
  padding: 10px 13px;
  background-color: ${({ color }) => color};
  color: ${({ textColor }) => textColor};
  font-size: 15px;
  font-weight: bold;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 4px;
`;
