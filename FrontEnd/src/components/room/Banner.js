import styled from 'styled-components';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Container = styled.div`
  width: 1200px;
  overflow:hidden;
`;

const StyledSlider = styled(Slider)`
    .slick-slide div{
      outline: none;
    }
`;

const ImageContainer = styled.img `
  height: 270px;
  width: 1200px;
  background-color: #EAF1FF;
  margin-bottom: 100px;
`

const items = [
  { id: 1, url: 'imgUrl' },
  { id: 2, url: 'imgUrl' },
  { id: 3, url: 'imgUrl' },
];

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    focusOnSelect: true,
  };
  return (
    <Container>
      <StyledSlider {...settings}>
        {items.map((item) => (
            <>
              <ImageContainer 
              src={item.url}
              key={item.id}
              />
            </>
        ))}
      </StyledSlider>
    </Container>
  );
  }

export default Banner