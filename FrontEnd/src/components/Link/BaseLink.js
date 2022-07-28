import { Link } from "react-router-dom";
import styled from "styled-components";

export const BaseLink = styled(Link)`
    text-decoration: none;
    color: ${({color})=> color};
    font-family: "Black Han Sans";
    font-size: 18px;
`

BaseLink.defaultProps = {
    color : "whitesomke"
}