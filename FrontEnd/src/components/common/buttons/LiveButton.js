import styled from "styled-components";

export const LiveButton = styled.button`
width: 148px;
height: 52px;
margin-right: 20px;
border-radius: 30px;
background-color: rgba(18, 21, 39, 0.86);
color: #EAF1FF;
font-weight: 500;
font-size: 18px;
margin-top: 40px;
line-height: 3px;
box-shadow: inset 2px 2px 2px 0px rgba(0,0,0,.1),
 7px 7px 20px 0px rgba(0,0,0,.1),
 4px 4px 5px 0px rgba(0,0,0,.1);
cursor: pointer;
&:hover{
  background: linear-gradient(0deg, #7E7E97 0%, #7E7E97 100%);
  color: #fff;
  transition: all 0.3s linear;
  transform: scale(1.05);
}
`;