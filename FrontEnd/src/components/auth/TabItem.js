import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const TabCard = styled.li`
  margin: 40px 0px 80px 0px;
  padding: 16px;
  border-left: 2px solid transparent;
  cursor: pointer;
  &.active {
    border-left: 2px solid #6f92bf;
  }
`;

const StyledNavLink = styled(NavLink)`
  /* padding: 16px; */
  font-family: "Courier New";
  &.active {
    border-left: 2px solid #6f92bf;
  }
`;
const TabItem = ({ tabId, title, isActive, onClick }) => {
  return (
    <TabCard
      className={isActive ? "active" : ""}
      onClick={() => onClick(tabId)}
    >
      {title}
    </TabCard>
  );
};

export default TabItem;
