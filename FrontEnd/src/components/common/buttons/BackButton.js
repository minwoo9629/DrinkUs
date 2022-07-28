import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const GoToBack = styled.button`
  border: none;
  cursor: pointer;
  padding: 12px 14px;
  background-color: #676775;
  border-radius: 100%;
  position: absolute;
  top: 32px;
  left: 40px;
`;
export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <GoToBack onClick={() => navigate(-1)}>
        <i className="fas fa-arrow-left"></i>
      </GoToBack>
    </div>
  );
};
