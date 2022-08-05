import styled from "styled-components";

const ProfileButtonStyled = styled.button`
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  border: none;
  border-radius: ${(props) => props.borderRadius};
  padding: ${(props) => props.padding};
  font-size: ${(props) => props.fontSize};
  cursor: pointer;
`;

ProfileButtonStyled.defaultProps = {
  color: "black",
  bgColor: "",
  padding: "8px 20px",
  fontSize: "16px",
  borderRadius: "0px",
};

const ProfileButton = ({
  text,
  onClick,
  color,
  bgColor,
  padding,
  fontSize,
  borderRadius,
}) => {
  return (
    <ProfileButtonStyled
      onClick={onClick}
      color={color}
      bgColor={bgColor}
      padding={padding}
      fontSize={fontSize}
      borderRadius={borderRadius}
    >
      {text}
    </ProfileButtonStyled>
  );
};

export default ProfileButton;
