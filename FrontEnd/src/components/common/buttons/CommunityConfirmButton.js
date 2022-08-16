import styled from "styled-components";

const CalendarButton = styled.button`
  padding: 10px 13px;
  width: 100px;
  font-size: 15px;
  font-weight: bold;
  margin-right: ${(props) => props.marginRight || "10px"};
  cursor: ${(props) => props.cursor};
  border-radius: 4px;
  background-color: ${(props) => props.background};
  color: ${(props) => props.color};
  border: 2px solid ${(props) => props.borderColor};

  &:hover {
    background-color: ${(props) => props.hoverBackground};
    color: ${(props) => props.hoverColor};
    transition: all 0.2s linear;
    border: 2px solid ${(props) => props.hoverBorderColor};
  }
`;

export const CommunityConFirmButton = ({
  event,
  background,
  color,
  borderColor,
  hoverBackground,
  hoverColor,
  hoverBorderColor,
  cursor,
  content,
  marginRight,
}) => {
  return (
    <CalendarButton
      onClick={event}
      background={background}
      color={color}
      borderColor={borderColor}
      hoverBackground={hoverBackground}
      hoverColor={hoverColor}
      hoverBorderColor={hoverBorderColor}
      cursor={cursor}
      marginRight={marginRight}
    >
      {content}
    </CalendarButton>
  );
};

CalendarButton.defaultProps = {
  background: "#bdcff2",
  color: "#fff",
  borderColor: "#bdcff2",
  hoverBackground: "#5d81c9",
  hoverColor: "#fff",
  hoverBorderColor: "#5d81c9",
  cursor: "pointer",
};
