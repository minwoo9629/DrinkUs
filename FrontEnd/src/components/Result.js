import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {Wrapper, RoundedWrapper} from "../components/styled/Wrapper"


const getCookieValue = (key) =>{
    let cookieKey = `${key}=`;

    const cookieArr = document.cookie.split("; ");

    for(let i=0; i< cookieArr.length; i++){
        if(cookieArr[i].indexOf(key) === 0){
            let value = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
            console.log(value)
            return value;
        }
    }
}

const deleteCookie = (key) => {
    document.cookie = encodeURIComponent(key) + '=; expires=Thu, 01 JAN 1999 00:00:10 GMT';
}


// temp Styled component


const GoToHome = styled.button`
    padding: 12px 24px;
    margin-top: 60px;
    border-radius: 11px;
    background-color: #bdcff2;
    color: white;
    font-size: 18px;
`
const Result = () =>{
    const [state, setState] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const userId = getCookieValue("userId");
        setState(userId);
    })
    return (
        <Wrapper>
            <RoundedWrapper width={"840"} height={"400"} mWidth={"300"} mHeight={"200"}>
                <h2 style={{color:"white"}}>{state}로 임시비밀번호가 전송되었습니다.</h2>
                <GoToHome onClick={()=> navigate("/")}>홈으로</GoToHome>
            </RoundedWrapper>
        </Wrapper>
    )
}

export default Result