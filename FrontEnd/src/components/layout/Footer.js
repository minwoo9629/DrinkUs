import styled from "styled-components";

const FooterWrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 120px;
  width: 100%;
  margin-top: auto;
  background-color: aliceblue;
  color: #131317;
  text-align: center;
  padding: 10px;
`

const FooterBlock = styled.div`
  display: flex;
  flex: 1,
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-right: 1px solid darkgrey;
`;

const DeveloperInfo = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 12px;
  margin-left: 4px;
  margin-right: 4px;
`;


const Footer = () => {

  const getYear = () => {
    const year = new Date().getFullYear();
    return year;
  };

  return (
    <FooterWrapper>
      <FooterBlock>
        <img 
          src={process.env.PUBLIC_URL + '/assets/gitlab.png'} 
          height="36px"
          onClick={() => { window.open("https://lab.ssafy.com/s07-webmobile1-sub2/S07P12B306") }}
        />
      </FooterBlock>
      <FooterBlock>
        <p>
          &copy; <span>{getYear()}</span> Drinkus. All Rights reserved.
        </p>
      </FooterBlock>
      <FooterBlock>
        Developed By
        <DeveloperInfo>
          김갑경,
        </DeveloperInfo>
        <DeveloperInfo>
          김민정,
        </DeveloperInfo>
        <DeveloperInfo>
          성유지,
        </DeveloperInfo>
        <DeveloperInfo>
          이민우,
        </DeveloperInfo>
        <DeveloperInfo>
          조민규,
        </DeveloperInfo>
        <DeveloperInfo>
          한다빈
        </DeveloperInfo>
      </FooterBlock>
    </FooterWrapper>
  )
}

export default Footer