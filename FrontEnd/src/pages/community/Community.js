import { useState } from "react";
import styled from "styled-components";
import Header from "../../components/layout/Header";

import CalendarCommunity from "./calendarContents/CalendarCommunity";
import DailyCommunity from "./dailyContents/DailyCommunity";

const Community = () => {
  const [communityMode, setCommunityMode] = useState("calendar");

  // 스타일 지정

  const InnerWrapper = styled.div`
    width: 1200px;
    margin: 55px 10px 10px 0;
  `;

  const CalendarButtonWrapper = styled.div`
    margin-left: 20px;
  `;

  const CalendarButton = styled.button`
    padding: 12px 24px;
    background-color: ${({ color }) => color};
    color: ${({ textColor }) => textColor};
    font-size: 15px;
    margin: auto 0;
    border: 1px solid #bdcff2;
    cursor: pointer;

    border-radius: 1px;
    font-weight: bold;
  `;

  const ContentWrapper = styled.div`
    margin-top: 40px;
    text-align: center;
  `;

  // 스타일 끝

  return (
    <>
      <Header location={"lightzone"} />
      <InnerWrapper>
        <CalendarButtonWrapper>
          <CalendarButton
            onClick={() => setCommunityMode("calendar")}
            color={communityMode == "calendar" ? "#bdcff2" : "#ffffff"}
            textColor={communityMode == "calendar" ? "#fff" : "#6F92BF"}
          >
            월간
          </CalendarButton>
          <CalendarButton
            onClick={() => setCommunityMode("daily")}
            color={communityMode == "calendar" ? "#fff" : "#bdcff2"}
            textColor={communityMode == "calendar" ? "#6F92BF" : "#fff"}
          >
            일간
          </CalendarButton>
        </CalendarButtonWrapper>
        <ContentWrapper>
          {communityMode == "calendar" ? (
            <CalendarCommunity />
          ) : (
            <DailyCommunity />
          )}
        </ContentWrapper>
      </InnerWrapper>
    </>
  );
};

export default Community;
