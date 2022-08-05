import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const TabCard = styled.div`
  margin: 40px 0px 80px 0px;
  cursor: pointer;
  padding: 16px 0px;
`;

const StyledNavLink = styled(NavLink)`
  color: black;
  text-decoration: none;
  padding: 16px;
  border-left: 2px solid transparent;
  font-family: "Courier New";
  &.active {
    border-left: 2px solid #6f92bf;
  }
`;
const TabItem = ({ tabId, title, link }) => {
  return (
    <TabCard>
      <StyledNavLink to={link}>{title}</StyledNavLink>
    </TabCard>
  );
};

export default TabItem;
