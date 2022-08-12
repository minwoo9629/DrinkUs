import styled from 'styled-components';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Container = styled.div`
  width: 1200px;
  overflow:hidden;
  border-radius: 30px;
`;

const StyledSlider = styled(Slider)`
    .slick-slide div{
      outline: none;
    }
`;

const Image = styled.img`
  max-width:1200px;
  max-height:1200px;
`;

const ImageContainer = styled.div `
  height: 270px;
  width: 1200px;
  border-radius: 30px;
  background-color: #EAF1FF;
  margin-bottom: 100px;
`

// const imgUrl = require('./image/temp.jpg');

const items = [
  { id: 1, url: 'imgUrl' },
  { id: 2, url: 'imgUrl' },
  { id: 3, url: 'imgUrl' },
  { id: 4, url: 'imgUrl' },
  { id: 5, url: 'imgUrl' },
  { id: 6, url: 'imgUrl' },
  { id: 7, url: 'imgUrl' },
  { id: 8, url: 'imgUrl' },
  { id: 9, url: 'imgUrl' },
  { id: 10, url: 'imgUrl' },
];

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
  };
  return (
    <Container>
      <h2> Single Item</h2>
      <StyledSlider {...settings}
      >
        {items.map(item => {
          return (
            <div key={item.id}>
              <ImageContainer>
                <Image src={item.url} />
              </ImageContainer>
            </div>
          );
        })}
      </StyledSlider>
    </Container>
  );
  }

export default Banner